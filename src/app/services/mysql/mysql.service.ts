import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Course, ScheduleCourse, Student } from 'src/app/components/models/model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MysqlService {

	private REST_API_SERVER = environment.apiUrl;

  constructor(private http: HttpClient) { }

  	// get available schedule from mysql
	getSchedule (course: Course) {
		return this.http.post(this.REST_API_SERVER + '/ui/getSchedule', course)
			.pipe(catchError(this.handleError));
	} 

	// register for a course based on schedule
	registerSchedule(scheduleCourse: ScheduleCourse) {
		return this.http.post(this.REST_API_SERVER + '/ui/registerSchedule', scheduleCourse)
		.pipe(catchError(this.handleError))
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
