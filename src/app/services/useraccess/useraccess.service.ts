import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UseraccessService {

	private REST_API_SERVER = environment.apiUrl;
  
	constructor(private http: HttpClient) { }

	// create a new user
  registerNewUser(student: any) {
		return this.http.post(this.REST_API_SERVER + `/mongo/registration/registerNewUser`, student)
			.pipe(catchError(this.handleError));
	}

	// get user by username and password
  userLogin(student: any) {							  
		return this.http.post(this.REST_API_SERVER + `/mongo/login/findUserByUserNameAndPassword`, student)
			.pipe(catchError(this.handleError));
	}

  handleError(error: HttpErrorResponse) {
		let errorMessage = 'Unknown error!';
		console.log('Error from Error Handler');
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
