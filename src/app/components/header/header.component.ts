import { Component, OnInit } from '@angular/core';
import { Student, UserSession, WebCourse } from '../models/model';
import { CommunicationService } from 'src/app/services/common/communication.service';
import { MongoService } from 'src/app/services/mongo/mongo.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

	searchContent!: string;
	userSession!: UserSession;
	//previousSession!: UserSession;
	loggedUser!: any;

	constructor(
		private comService: CommunicationService,
		private mongoService: MongoService
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

		if (this.searchContent === undefined)
			return;

		this.mongoService.getCourseListByCourseDesc(this.searchContent).subscribe(data => {
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
	//	if (this.userSession.loggedStudent.enrolledCourses != null && 
	//			this.userSession.loggedStudent.enrolledCourses.length>0) {
			this.userSession.nextScreen= '<app-enrolcourse>';
			this.comService.changeScreen(this.userSession);
	//	}
	}
	
	findAvailableCourses(value: any) {

		this.mongoService.getWebCourseList(value).subscribe(data => {
			if (this.userSession === undefined) {
				this.userSession = new UserSession(); 
			}
			let webCourse !:any;
			
			webCourse = data;
			this.userSession.webCourse = new WebCourse();
			this.userSession.webCourse.subjectId = webCourse.subjectId;
			this.userSession.webCourse.name = webCourse.name;
			this.userSession.webCourse.availableCourses = webCourse.availableCourses,

			this.userSession.nextScreen='<app-availablecourses>';
			this.comService.changeScreen(this.userSession);
		});

		 
	}

}