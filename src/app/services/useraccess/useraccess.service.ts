import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UseraccessService {

  private REST_API_SERVER = 'http://localhost:8080';
  
	constructor(private http: HttpClient) { }

  registerNewUser(student: any) {
		return this.http.post(this.REST_API_SERVER + `/user/registration/newuser`, student)
			.pipe(catchError(this.handleError));
	}

  userLogin(student: any) {							  
		return this.http.post(this.REST_API_SERVER + `/user/login/currentuser`, student)
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
