import { Component, OnInit } from '@angular/core';
import { CommunicationService } from 'src/app/services/common/communication.service';
import { CourseService } from 'src/app/services/course/course.service';
import { UserSession } from '../../models/model';

import { CheckoutService } from 'src/app/services/checkout/checkout.service';
import { environment } from 'src/environments/environment';

declare var Stripe: any;

@Component({
  selector: 'app-webcoursecheckout',
  templateUrl: './webcoursecheckout.component.html',
  styleUrls: ['./webcoursecheckout.component.css']
})
export class WebcoursecheckoutComponent implements OnInit {

  userSession!: UserSession;
  private stripe!: any;;
  private card: any = null;
  private elements: any = null;
  public cardError!: string;
  public chargeError: any = null;
  public charge: any = null;

  constructor(
		private comService: CommunicationService,
		private checkoutService: CheckoutService
	) {
		this.comService.userSession$.subscribe( session => {
			this.userSession = session;

		})
	 }

  ngOnInit(): void {
    this.checkoutService.initializeStripe().subscribe(() => {
      this.stripe = Stripe(environment.stripePublicKey);
      this.elements = this.stripe.elements();
      this.card = this.elements.create('card');
      this.card.mount('#card-element');
      this.card.addEventListener('change',
        (        event: { error: { message: string; }; }) => event.error ? this.cardError = event.error.message : null);
    });
  }



  // amount in dollars for display; courseFee is in cents, as sent to Stripe
  get priceInDollars(): number {
    return (this.userSession?.scheduleCourse?.courseFee ?? 0) / 100;
  }

  chargeCard(token:string) {

    this.charge = null;
    this.chargeError = null;
    const student = this.userSession.loggedStudent;
    const course = this.userSession.scheduleCourse;
    // sa-mysql charges the course fee from its database, records the payment and registers
    // the student for the chosen date; the reply says whether the registration worked
    this.checkoutService.checkout(token, course.courseFee, 'usd', student.userId, student.userName,
        course.courseId, course.scheduleId).subscribe(
       data => {
         this.charge = data;
       },
       error => {
         this.chargeError = error;
       })
  }

  public getToken() {
    this.stripe.createToken(this.card).then((result: { error: { message: string; }; token: string; }) => {
      if (result.error) {
        this.cardError = result.error.message;
      } else {
        this.chargeCard(result.token);
      }
    });
  }

}

