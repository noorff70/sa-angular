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
			
			this.userAccessService.registerNewUser(this.student).subscribe(returnObject => {
				this.registerReturned = returnObject;
				if (this.registerReturned.loginSuccess == true) {
					this.returnSuccess = true;
					this.returnMsg = this.registerReturned.msgReturned + ". Please login with Username and Password Just created.";
					
				} else {
					this.returnSuccess = false;
					if (this.returnMsg === 'User already exists. Please use a different Name') {
						this.registerForm.reset();
					}  else {
						this.serverError = this.registerReturned.msgReturned;
						this.hasServerError = true;
					}


				//	this.clearText();
				}
			})
		}
	}
	
	 onReset() {
        this.submitted = false;
		this.returnMsg = '';
        this.registerForm.reset();
    }

}
