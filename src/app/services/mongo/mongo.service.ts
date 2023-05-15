import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { RequestObject } from 'src/app/components/models/model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MongoService {

  private REST_API_SERVER = environment.apiUrl;

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
		let req= new RequestObject;
		req.webCourseSearchCriteria = desc;
		return this.http.post(this.REST_API_SERVER + `/mongo/getWebCourseList`, req)

			.pipe(catchError(this.handleError));
	} 


	// service call to mongodb on course table
	getCourseListByCourseDesc(contentDesc: string) {
		let req= new RequestObject;
		req.courseDescription = contentDesc
		return this.http.post(this.REST_API_SERVER + `/mongo/getCourseListByCourseDesc`, req)
			.pipe(catchError(this.handleError));
	}

	// get tutor
	findTutorByTutorId(tutorId: string) {
		let req= new RequestObject;
		req.tutorId = tutorId;

		return this.http.post(this.REST_API_SERVER + `/mongo/findTutorByTutorId`, req)
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
