import { Component, OnInit } from '@angular/core';
import { CommunicationService } from 'src/app/services/common/communication.service';
import { APIResponseObject, RequestObject, Student, UserSession } from '../../models/model';
import { WebCourseService } from 'src/app/services/webcourse/webcourse.service';

@Component({
  selector: 'app-webcourseregister',
  templateUrl: './webcourseregister.component.html',
  styleUrls: ['./webcourseregister.component.css']
})
export class WebcourseregisterComponent implements OnInit {

  userSession!: UserSession;
  isFree:boolean=false;
  returnedMsg!: string;
  returnedStatus!:string;

  constructor(
		private comService: CommunicationService,
    private webCourseService: WebCourseService
		
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

    let req= new RequestObject; 
    req.webAddStudent = this.userSession.loggedStudent;
    req.webSubjectId = this.userSession.scheduleCourse.subjectId;
    req.webAvailableCourseId = this.userSession.scheduleCourse.courseId
    req.webCourseScheduleId = this.userSession.scheduleCourse.scheduleId;
    

    this.webCourseService.addStudentToScheduledCourse(req).subscribe(data => {

      let response!: any;
			response = data;

     // if (response.apiResponseStatus === 'STATUS_SUCCESS') {
        this.returnedMsg = response.msgReturned;
        this.returnedStatus = response.apiResponseStatus
     // }
      console.log();
    })
  }

}
