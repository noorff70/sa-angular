import { Component, OnInit } from '@angular/core';
import { CommunicationService } from 'src/app/services/common/communication.service';
import { WebAvailableCourse, UserSession, WebCourse } from '../../models/model';

@Component({
  selector: 'app-availablecourses',
  templateUrl: './availablecourses.component.html',
  styleUrls: ['./availablecourses.component.css']
})
export class AvailablecoursesComponent implements OnInit {

  userSession!: UserSession;
	loggedUser!: string;
  avaliableCourse!: any[];

  constructor(
    private comService: CommunicationService,

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
          this.userSession.selectedWebCourse = this.avaliableCourse[i]
        }
      }
    }
    
    
   // this.userSession.selectedWebCourse.courseId = courseId;
    this.userSession.nextScreen= '<app-webcourse>';
		this.comService.changeScreen(this.userSession);
  }

}
