import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Student, UserAccessReturnObject, UserSession } from '../models/model';
import { CommunicationService, MustMatch } from 'src/app/services/common/communication.service';
import { RestService } from 'src/app/services/rest/rest.service';
import { UseraccessService } from 'src/app/services/useraccess/useraccess.service';

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
	registerReturned!: any;
	currentSession!: UserSession;
	errorMsg: any[];
	hasServerError!: boolean;
	serverError: any;
	returnSuccess: boolean = false;
	returnMsg!: string;

	registerForm!: FormGroup;
	submitted = false;

	constructor(
		//private restService: RestService,
		private userAccessService: UseraccessService,
		private comService: CommunicationService,
		private formBuilder: FormBuilder
	) {
		this.errorMsg = [];
		//this.registerReturned = new UserAccessReturnObject;
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
			this.student.firstName = this.registerForm.value.fName;
			this.student.lastName = this.registerForm.value.lName;
			this.student.userName = this.registerForm.value.userName;
			this.student.email = this.registerForm.value.email;
			
			this.userAccessService.registerNewUser(this.student).subscribe(returnObject => {
				this.registerReturned = returnObject;
				if (this.registerReturned.success == true) {
					this.returnSuccess = true;
					this.returnMsg = this.registerReturned.msgReturned;
					if (this.returnMsg === 'User already exists. Please use a different Name') {
						this.registerForm.reset();
					}

				//	this.updateLocalStorage();
					
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
		this.returnMsg = '';
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
		this.currentSession.loggedStudent.userName = this.userName;
		localStorage.setItem('usersession', JSON.stringify(this.currentSession));

		this.comService.changeScreen(this.currentSession);
	}

	 clearText() {

		this.fName = '';
		this.lName = '';
		this.password1 = '';
		this.password2 = '';
		this.userName = '';
		this.email = '';
	}

}
