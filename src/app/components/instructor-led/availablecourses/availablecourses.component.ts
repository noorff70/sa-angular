import { Component, OnInit } from '@angular/core';
import { CommunicationService } from 'src/app/services/common/communication.service';
import { UserSession } from '../../models/model';

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
    this.avaliableCourse = this.userSession.webCourseList.availableCourses;

    console.log(this.avaliableCourse);
  }

  selectCourse(courseId: number) {
    this.userSession.webCourseList  = [];
    this.userSession.webCourseList = this.avaliableCourse;
    this.userSession.selectedWebCourse = courseId;
    this.userSession.nextScreen= '<app-webcourse>';
		this.comService.changeScreen(this.userSession);
    //console.log("Course Selected" + courseId);
  }

}
