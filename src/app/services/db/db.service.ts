import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Student, UserCourse } from 'src/app/components/models/model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  //private REST_API_SERVER = 'http://localhost:8080';
  private REST_API_SERVER = environment.apiUrl;

  constructor(private http: HttpClient) { }


  // add a new course to student profile
  addCourseToUser(userId: number, courseId: number, userName: string) {
		let course = new UserCourse();
		course.courseId = courseId;
		course.userId = userId;
		course.userName = userName;

		return this.http.post(this.REST_API_SERVER + `/mongo/addCourseToUser`, course)
			.pipe(catchError(this.handleError));
	}

	// get contents for a student after login
	getCourseContentsWithStudentId (student: Student) {
		return this.http.post(this.REST_API_SERVER + '/ui/getContentsByStudentId', student)
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
