import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Student, UserSession } from '../models/model';
import { CommunicationService, MustMatch } from 'src/app/services/common/communication.service';
import { UserService } from 'src/app/services/useraccess/user.service';

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
		private userAccessService: UserService,
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
			
			// clear the previous attempt's message first
			this.returnMsg = '';
			this.returnSuccess = undefined as any;
			this.userAccessService.registerNewUser(this.student).subscribe(returnObject => {
				this.registerReturned = returnObject;
				if (this.registerReturned.loginSuccess == true) {
					this.returnSuccess = true;
					this.returnMsg = this.registerReturned.msgReturned + ". Please login with Username and Password Just created.";

				} else {
					// show the server's reason (user name taken, email taken, ...) in red
					this.returnSuccess = false;
					this.returnMsg = this.registerReturned.msgReturned;
					this.serverError = this.registerReturned.msgReturned;
					this.hasServerError = true;
					if (this.registerReturned.msgReturned === 'User already exists. Please use a different Name') {
						this.registerForm.reset();
						this.submitted = false;   // no "required" warnings on the emptied form
					}
				}
			}, error => {
				this.returnSuccess = false;
				this.returnMsg = 'Could not reach the server. Please try again later.';
			})
		}
	}
	
	 onReset() {
        this.submitted = false;
		this.returnMsg = '';
        this.registerForm.reset();
    }

}
