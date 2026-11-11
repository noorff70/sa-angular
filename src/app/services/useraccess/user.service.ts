import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { RequestObject } from 'src/app/components/models/model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

	// all calls go to sa-mysql (/ui/...) through the gateway
	private REST_API_SERVER = environment.apiUrl;

	constructor(private http: HttpClient) { }

	// create a new user
  registerNewUser(student: any) {
		return this.http.post(this.REST_API_SERVER + `/ui/register/user`, student)
			.pipe(catchError(this.handleError));
	}

	// log in; the reply carries the user's enrolled courses in student.course
  userLogin(student: any) {
		return this.http.post(this.REST_API_SERVER + `/ui/login/user`, student)
			.pipe(catchError(this.handleError));
	}

  	// tutor profile of an instructor-led course
	findTutorByTutorId(tutorId: string) {
		let req= new RequestObject;
		req.tutorId = tutorId;

		return this.http.post(this.REST_API_SERVER + `/ui/findTutorByTutorId`, req)
			.pipe(catchError(this.handleError));
	}

  handleError(error: HttpErrorResponse) {
		let errorMessage = 'Unknown error!';
		if (error.error instanceof ErrorEvent) {
			// Client-side errors
			errorMessage = `Error: ${error.error.message}`;
		} else {
			// Server-side errors
			errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
		}
		return throwError(errorMessage);
	}
}
