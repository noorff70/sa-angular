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
	contents: any;
	rows!: number;
	currentSession: UserSession = new UserSession();
	enrolledStatus: boolean = false;
	enrolledContents: any;

	constructor(
		private comService: CommunicationService
	) {
		this.comService.userSession$.subscribe(session => {
			if (session != undefined && session.nextScreen === '<app-enrolcourse>') {
				//this.loggedUser = session.loggedStudent.userName;
				//this.userSession.enrolledContents = session.enrolledContents;
				//this.enrolledStatus = session.loggedStatus;
				this.currentSession = session;
				this.enrolledContents = session.loggedStudent.enrolledCourses;
				this.displayContents();
			}
			
		})
	}

	ngOnInit() {
		
	}

	displayContents() {
		this.contents = this.enrolledContents;
		if (this.contents !== undefined) {
			this.rows = this.contents.length / 3;
			if (this.rows % 3 > 0) {
				this.rows++;
			}
		}
	}

	selectContent(contentId: any) {
	
			//this.currentSession = new UserSession();
			this.currentSession.contentId = contentId;
			//this.currentSession.loggedStatus = this.enrolledStatus;
			//this.currentSession.enrolledContents = this.enrolledContents;
			//this.currentSession.loggedStudent.userName = this.loggedUser;
			this.currentSession.nextScreen = '<app-lesson>';
			//this.currentSession.enrolledContents = this.contents;
			this.comService.changeScreen(this.currentSession); 
	}

}
