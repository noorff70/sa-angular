import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SendMessageObject, Student } from 'src/app/components/models/model';

@Injectable({
	providedIn: 'root'
})
export class RestService {

  	private REST_API_SERVER = 'http://localhost:8080';
  
	constructor(private http: HttpClient) { }

	// service call to sa-mysql
	getContentList(contentDesc: any) {
		return this.http.post(this.REST_API_SERVER + `/ui/getContentListByContentDesc`, contentDesc)
			.pipe(catchError(this.handleError));
	}

	//service call to email
	
	sendEmail (message: SendMessageObject) {
		return this.http.post(this.REST_API_SERVER +  '/email/sendEmail', message//{
		)
		.pipe(catchError(this.handleError));
	}


	/*getCoursesForLoggedUser(student: any) {
		return this.http.post(this.REST_API_SERVER + `/loggedUserContents`, student)
			.pipe(catchError(this.handleError));
	}*/


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
