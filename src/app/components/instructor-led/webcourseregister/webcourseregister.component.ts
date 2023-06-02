import { Component, OnInit } from '@angular/core';
import { CommunicationService } from 'src/app/services/common/communication.service';
import { UserSession } from '../../models/model';

@Component({
  selector: 'app-webcourseregister',
  templateUrl: './webcourseregister.component.html',
  styleUrls: ['./webcourseregister.component.css']
})
export class WebcourseregisterComponent implements OnInit {

  userSession!: UserSession;
  isFree:boolean=false;

  constructor(
		private comService: CommunicationService,
		
	) {
		this.comService.userSession$.subscribe( session => {
			this.userSession = session;
		})
	 }

  ngOnInit(): void {

    this.checkIfCourseFree();
  }

  moveToCheckout() {
    this.userSession.nextScreen = '<app-webcoursecheckout>';
    this.comService.changeScreen(this.userSession);
  }

  backToPrevious() {
    this.userSession.nextScreen = '<app-webcourse>';
    this.comService.changeScreen(this.userSession);
  }

  checkIfCourseFree() {
    if (this.userSession.selectedWebCourse.courseFee == 0) {
      this.isFree = true;
    }
  }

  registerCourse () {
    
  }

}
