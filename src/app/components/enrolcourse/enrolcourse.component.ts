import { Component, OnInit } from '@angular/core';
import { CommunicationService } from 'src/app/services/common/communication.service';
import { UserSession } from '../models/model';

@Component({
	selector: 'app-enrolcourse',
	templateUrl: './enrolcourse.component.html',
	styleUrls: ['./enrolcourse.component.css']
})
export class EnrolcourseComponent implements OnInit {

	loggedUser!: string;
	userSession: UserSession = new UserSession;
	course: any;
	rows!: number;
	currentSession: UserSession = new UserSession();
	enrolledStatus: boolean = false;
	enrolledContents: any;
	displayMsg!: string;

	constructor(
		private comService: CommunicationService
	) {
		this.comService.userSession$.subscribe(session => {
			if (session != undefined && session.nextScreen === '<app-enrolcourse>') {
				this.currentSession = session;
				this.enrolledContents = session.loggedStudent.enrolledCourses;
				this.displayContents();
			}
			
		})
	}

	ngOnInit() {
		
	}

	displayContents() {
		this.course = this.enrolledContents;
		if (this.course !== undefined && this.course !== null) {
			this.rows = this.course.length / 3;
			if (this.rows % 3 > 0) {
				this.rows++;
			}
		}
		if (this.currentSession.loggedStudent!= null && this.course == null) {
			this.displayMsg = "You do not have any enrolled course. Please enroll a course";
		}
	}

	selectContent(courseId: any) {
	
			this.currentSession.courseId = courseId;
			this.currentSession.nextScreen = '<app-lesson>';
			this.comService.changeScreen(this.currentSession); 
	}

}
