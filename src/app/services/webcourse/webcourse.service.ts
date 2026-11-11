import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { RequestObject, Student, UserCourse } from 'src/app/components/models/model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebCourseService {

  private REST_API_SERVER = environment.apiUrl;

  constructor(private http: HttpClient) { }

  	// instructor-led courses of a subject ('Java', 'Web Technologies', 'Free Courses')
	  getWebCourseList (desc: string) {
		let req= new RequestObject;
		req.webCourseSearchCriteria = desc;
		return this.http.post(this.REST_API_SERVER + `/ui/getWebCourseList`, req)

			.pipe(catchError(this.handleError));
	}

	// register for a date of a FREE instructor-led course (paid ones go through checkout)
	addStudentToScheduledCourse(requestObject: RequestObject) {

		return this.http.post(this.REST_API_SERVER + `/ui/addStudentToScheduledCourse`, requestObject)
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
