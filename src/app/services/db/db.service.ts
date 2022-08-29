import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Student, UserContent } from 'src/app/components/models/model';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  private REST_API_SERVER = 'http://localhost:8080';

  constructor(private http: HttpClient) { }


  // add a new course to student profile
  addContentForStudent(userId: number, contentId: number) {
		let content = new UserContent();
		content.contentId = contentId;
		content.userId = userId;

		return this.http.post(this.REST_API_SERVER + `/ui/addContentToStudent`, content)
			.pipe(catchError(this.handleError));
	}

	// get contents for a student after login
	getContentsWithStudentId (student: Student) {
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
