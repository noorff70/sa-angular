import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Course, Student } from 'src/app/components/models/model';

@Injectable({
  providedIn: 'root'
})
export class MysqlService {

  private REST_API_SERVER = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  	// get available schedule from mysql
	getSchedule (course: Course) {
		return this.http.post(this.REST_API_SERVER + '/ui/getSchedule', course)
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
