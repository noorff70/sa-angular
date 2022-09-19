import { Component, OnInit } from '@angular/core';
import { Student, UserSession } from '../models/model';
import { RestService } from 'src/app/services/rest/rest.service';
import { CommunicationService } from 'src/app/services/common/communication.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

	searchContent!: string;
	userSession!: UserSession;
	previousSession!: UserSession;
	loggedUser!: any;

	constructor(
		private restService: RestService,
		private comService: CommunicationService
	) {
		this.comService.userSession$.subscribe( session => {
			this.userSession = session;
			if (session.loggedStudent !== undefined) {
				this.loggedUser = session.loggedStudent.userName;
			}
		})
	 }

	ngOnInit() {
	}

	searchForContent() {
		this.restService.getContentList(this.searchContent).subscribe(data => {
			if (this.userSession === undefined) {
				this.userSession = new UserSession();
				this.userSession.searchedContents = data;
				this.userSession.courseId = null;
				this.userSession.nextScreen = '<app-home>';
			} else if (this.userSession !== undefined && this.userSession.loggedStudent === null){
				this.userSession = new UserSession();
				this.userSession.searchedContents = data;
				this.userSession.courseId = null;
				this.userSession.nextScreen = '<app-home>';
			} else {
				this.userSession.searchedContents = data;
				this.userSession.courseId = null;
				this.userSession.nextScreen = '<app-home>';
			}
			this.userSession.didSearch = true;
	
			this.changeScreen();
		});
	}

	changeScreen() {
		this.comService.changeScreen(this.userSession);
	}
	
	userLogin() {
		this.userSession = new UserSession();
		let student = new Student();
		this.userSession.loggedStudent = student
		this.userSession.nextScreen = '<app-login>';
		this.comService.changeScreen(this.userSession );
	}
	
	register() {
		this.userSession = new UserSession();
		this.userSession.nextScreen = '<app-register>';
		localStorage.removeItem('currentsession');
		this.comService.changeScreen(this.userSession);
	}
	
	userLogoff() {
		this.loggedUser = null;
		
		this.userSession = new UserSession(); 
		this.userSession.enrolledContents= null;
		this.userSession.nextScreen = ('<app-home>');
		this.comService.changeScreen(this.userSession );
		
	}
	myCourses() {
		if (this.userSession.loggedStudent.enrolledCourses.length>0) {
			this.userSession.nextScreen= '<app-enrolcourse>';
			this.comService.changeScreen(this.userSession);
		}
	}
	
	findAvailableCourses(value: any) {

		this.restService.getWebCourseList(value).subscribe(data => {
			if (this.userSession === undefined) {
				this.userSession = new UserSession(); 
			}
	
			this.userSession.webCourseList = data;
			this.userSession.nextScreen='<app-availablecourses>';
			this.comService.changeScreen(this.userSession);
		});

		 
	}

}