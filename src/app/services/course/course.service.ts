import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { RequestObject, UserCourse } from 'src/app/components/models/model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  // all calls go to sa-mysql (/ui/...) through the gateway
  private REST_API_SERVER = environment.apiUrl;

  constructor(private http: HttpClient) {

  }

  // lesson page content of a course (empty lists when the course has none)
	getLessonByContentId(id: any) {
		return this.http.get(this.REST_API_SERVER + `/ui/getLessonByContentId`, {
			params: {
				CONTENTID: id
			}
		})
			.pipe(catchError(this.handleError));
	}

	  // add a new course to student profile .........................................................ok
	  addCourseToUser(userId: number, courseId: number, userName: string) {
		let course = new UserCourse();
		course.courseId = courseId;
		course.userId = userId;
		course.userName = userName;

		return this.http.post(this.REST_API_SERVER + `/ui/addCourseToUser`, course)
			.pipe(catchError(this.handleError));
	}


	// course search by description
	getCourseListByCourseDesc(contentDesc: string) {
		let req= new RequestObject;
		req.courseDescription = contentDesc
		return this.http.post(this.REST_API_SERVER + `/ui/getCourseListByCourseDesc`, req)
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
