import { Component, OnInit } from '@angular/core';
import { CommunicationService } from 'src/app/services/common/communication.service';
import { MongoService } from 'src/app/services/mongo/mongo.service';
import { UserSession } from '../../models/model';

//import { Http, Headers} from '@angular/http';
import { CreditcradcheckoutService } from 'src/app/services/creditcradcheckout.service';
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
		private checkoutService: CreditcradcheckoutService
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

  /*chargeCreditCard() {
    let form = document.getElementsByTagName("form")[0];
    (<any>window).Stripe.card.createToken({
      number: form.cardNumber.value,
      exp_month: form.expMonth.value,
      exp_year: form.expYear.value,
      cvc: form.cvc.value
    }, (status: number, response: any) => {
      if (status === 200) {
        let token = response.id;
        this.chargeCard(token);
      } else {
        console.log(response.error.message);
      }
    });
  }*/

  chargeCard(token:string) {
   
    this.charge = null;
    this.chargeError = null;
    this.checkoutService.checkout(token, 999, 'usd', 'pm_card_visa').subscribe ( data=>{
      console.log('');
    })
    
    
    //.subscribe(
    //  response => this.charge = response,
     // error => this.chargeError = error
    //);


  //  this.checkoutService.checkout(token).subscribe( data=> {
  //    console.log('checkout service called');
  //  });

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
//function Stripe(stripePublicKey: string): any {
 // throw new Error('Function not implemented.');
//

