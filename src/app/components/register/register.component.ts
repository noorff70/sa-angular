import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Student, UserSession } from '../models/model';
import { CommunicationService, MustMatch } from 'src/app/services/common/communication.service';
import { RestService } from 'src/app/services/rest/rest.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

	fName!: string;
	lName!: string;
	password1!: string;
	password2!: string;
	userName!: string;
	email!: string;
	student!: Student;
	registerReturned: any;
	currentSession!: UserSession;
	errorMsg: any[];
	hasServerError!: boolean;
	serverError: any;

	registerForm!: FormGroup;
	submitted = false;

	constructor(
		private restService: RestService,
		private comService: CommunicationService,
		private formBuilder: FormBuilder
	) {
		this.errorMsg = [];
	}

	ngOnInit() {
		this.registerForm = this.formBuilder.group({
			fName: ['', Validators.required],
			lName: ['', Validators.required],
			userName: ['', Validators.required],
			email: ['', [Validators.required, Validators.email]],
			password1: ['', [Validators.required, Validators.minLength(6)]],
			password2: ['', Validators.required]
		}, {
			 validator: MustMatch('password1', 'password2')
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
			this.student.password = this.registerForm.value.password1; //this.password1;
			this.student.studentFName = this.registerForm.value.fName;
			this.student.studentLName = this.registerForm.value.lName;
			this.student.userName = this.registerForm.value.userName;
			this.student.studentEmail = this.registerForm.value.email;
			
			this.restService.registerNewUser(this.student).subscribe(stu => {
				this.registerReturned = stu;
				if (this.registerReturned.registerSuccess == true) {
					this.updateLocalStorage();
		//			this.clearText();
				} else {
					this.serverError = this.registerReturned.msgReturned;
					this.hasServerError = true;
				//	this.clearText();
				}
			})
		}

		// display form values on success
		// alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
	}
	
	 onReset() {
        this.submitted = false;
        this.registerForm.reset();
    }

	/*userRegister() {

		this.student = new Student();
		this.student.password = this.password1;
		this.student.studentFName = this.fName;
		this.student.studentLName = this.lName;
		this.student.userName = this.userName;
		this.student.studentEmail = this.email;

		if (this.validateUser()) {
			this.userAccesService.registerNewUser(this.student).subscribe(stu => {
				this.registerReturned = stu;
				if (this.registerReturned.registerSuccess == true) {
					this.updateLocalStorage();
					this.clearText();
				} else {
					this.serverError = this.registerReturned.msgReturned;
					this.hasServerError = true;
					this.clearText();
				}
			})
		}
	}*/

	updateLocalStorage() {

		localStorage.removeItem('usersession');

		this.currentSession = new UserSession();

		//this.currentSession.currentScreen = '<app-header>';
		this.currentSession.nextScreen = '<app-home>';
		//this.currentSession.searchItem = this.contents;
		this.currentSession.loggedUser = this.userName;
		localStorage.setItem('usersession', JSON.stringify(this.currentSession));

		this.comService.changeScreen(this.currentSession);
	}

	/* clearText() {

		this.fName = '';
		this.lName = '';
		this.password1 = '';
		this.password2 = '';
		this.userName = '';
		this.email = '';
	}

	validateUser() {
		if (this.userName == undefined) {
			this.errorMsg.push('User name cannot be blank');
		}
		if (this.password1 == undefined) {
			this.errorMsg.push('Password cannot be blank');
		}
		if (this.password2 == undefined) {
			this.errorMsg.push('Password cannot be blank');
		}
		if (this.password1 != this.password2) {
			this.errorMsg.push('Password not matching');
		}
		if (this.email == undefined) {
			this.errorMsg.push('Email cannot be blank');
		}
		if (this.errorMsg.length == 0) {
			return true;
		} else {
			return false;
		}

	}*/

}
