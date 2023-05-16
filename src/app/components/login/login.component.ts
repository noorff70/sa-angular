import { Component, OnInit } from '@angular/core';
import { CommunicationService } from 'src/app/services/common/communication.service';

import { Student, UserSession } from '../models/model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { RestService } from 'src/app/services/rest/rest.service';
import { UseraccessService } from 'src/app/services/useraccess/useraccess.service';
import { DbService } from 'src/app/services/db/db.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	username!: string;
	password!: string;
	contents: any;
	student!: Student;
	currentSession!: UserSession;
	errorMsg: string[] = [];
	returnedMessage!: string;
	returnedStatus!: boolean;
	registerForm!: FormGroup;
	submitted = false;

	constructor(private comService: CommunicationService,
		private userAccessService: UseraccessService,
		private db: DbService,
		private formBuilder: FormBuilder) {
	}

	ngOnInit() {
		this.errorMsg = [];
		this.registerForm = this.formBuilder.group({
			username: ['', Validators.required],
			password: ['', Validators.required],
		});
	}

	// convenience getter for easy access to form fields
	get f() { return this.registerForm.controls; }

	onSubmit() {
		this.submitted = true;

		// stop here if form is invalid
		if (this.registerForm.invalid) {
			return;
		} else {
			this.student = new Student();
			this.student.password = this.registerForm.value.password;
			this.student.userName = this.registerForm.value.username;

			this.userAccessService.userLogin(this.student).subscribe(data => {
				this.contents = data;
				if (this.contents.loginSuccess === true) {
					this.student = new Student();
					this.currentSession = new UserSession();
					this.student.firstName = this.contents.student.firstName;
					this.student.lastName = this.contents.student.lastName;
					this.student.email = this.contents.student.email;
					this.student.userName = this.contents.student.userName;
					this.student.userId = this.contents.student.userId;
					this.currentSession.loggedStudent = this.student;
					this.currentSession.loggedStatus = true;
					this.currentSession.loggedStudent.enrolledCourses = this.contents.student.course;

					// now get all the saved contents for the user
/*					this.db.getCourseContentsWithStudentId(this.student).subscribe(courses => {
						let enrolledCourses: any = courses;
						this.currentSession.loggedStudent.enrolledCourses = enrolledCourses;
						console.log('');
					})*/
					this.currentSession.nextScreen = '<app-enrolcourse>';
					this.comService.changeScreen(this.currentSession);
				} else if (this.contents.loginSuccess === false && this.contents.msgReturned === 'NO_MATCH') {
					this.returnedStatus = false;
					this.returnedMessage = 'Password doesn not match';
					this.returnedStatus = false;
				}
				else {
					this.returnedStatus = false;
					if (this.contents.msgReturned === 'No User found') {
						this.returnedMessage = this.contents.msgReturned
					} else {
						this.returnedMessage = 'Contact Admin'
					}
				//	this.onReset();
				}
			})
		}
	}

	onReset() {
		this.submitted = false;
		this.returnedMessage = '';
		this.registerForm.reset();
	}

	registerUser() {
		this.currentSession = new UserSession();
		this.currentSession.nextScreen = '<app-register>';
		this.comService.changeScreen(this.currentSession);
	}

}
