import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MongoService {

  private REST_API_SERVER = 'http://localhost:8080';

  constructor(private http: HttpClient) { 

  }

  // servuce call to sa-mongo. lesson collection
	getLessonByContentId(id: any) {
		return this.http.get(this.REST_API_SERVER + `/mongo/getLessonByContentId`, {
			params: {
				CONTENTID: id
			}
		})
			.pipe(catchError(this.handleError));
	}


  	// service call to sa-mongo. webcourse collection
	getWebCourseList (desc: string) {
		return this.http.get(this.REST_API_SERVER + `/mongo/getWebCourseList`, {
			params: {
				WEBCOURSEDESC: desc
			}
		})
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
