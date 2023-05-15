import { Component, OnInit } from '@angular/core';
import { CommunicationService } from 'src/app/services/common/communication.service';
import { WebAvailableCourse, UserSession, WebCourse, Tutor } from '../../models/model';
import { MongoService } from 'src/app/services/mongo/mongo.service';

@Component({
  selector: 'app-availablecourses',
  templateUrl: './availablecourses.component.html',
  styleUrls: ['./availablecourses.component.css']
})
export class AvailablecoursesComponent implements OnInit {

  userSession!: UserSession;
	loggedUser!: string;
  avaliableCourse!: any[];
  returnValue!: any;

  constructor(
    private comService: CommunicationService,
    private mongoService: MongoService,

  ) { 
    this.avaliableCourse = [];
    this.comService.userSession$.subscribe( (session: any) => {
			this.userSession = session;
      this.loadWebCourse();
		})
  }

  
  ngOnInit() {
    this.loadWebCourse();
  }

  loadWebCourse() {
    if (this.userSession.webCourseList !== undefined) {
      this.avaliableCourse = this.userSession.webCourseList.availableCourses;
    }
  }

  selectCourse(courseId: number) {
    this.userSession.webCourseList  = new WebCourse();
    this.userSession.selectedWebCourse = new WebAvailableCourse();
    
    this.userSession.webCourseList.availableCourses = this.avaliableCourse;

    if (this.avaliableCourse !== undefined) {
      for (let i=0; i< this.avaliableCourse.length; i++) {
        if (this.avaliableCourse[i].courseId === courseId) {
          this.userSession.selectedWebCourse = this.avaliableCourse[i];
          if (this.userSession.selectedWebCourse.tutor == null) {
            this.mongoService.findTutorByTutorId (this.userSession.selectedWebCourse.tutorId).subscribe(data=>{
              this.returnValue = data;
              this.userSession.selectedWebCourse.tutor= new Tutor();
              this.userSession.selectedWebCourse.tutor.firstName = this.returnValue.firstName;
              this.userSession.selectedWebCourse.tutor.lastName = this.returnValue.lastName;
              this.userSession.selectedWebCourse.tutor.tutorEmail = this.returnValue.email;
              this.userSession.selectedWebCourse.tutor.tutorImage = this.returnValue.imageLocation;
              this.userSession.selectedWebCourse.tutor.tutorBio = this.returnValue.tutorBio;
            })
          }
        }
      }
    }
    
    
   // this.userSession.selectedWebCourse.courseId = courseId;
    this.userSession.nextScreen= '<app-webcourse>';
		this.comService.changeScreen(this.userSession);
  }

}
