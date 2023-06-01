export class Topic {
	topicId!: number;
  	topicName!: string;
  	topicDesc!: string;
}

export class Course {
	courseId!: number;
	courseName!: string;
	courseDesc!: string;
	tutorId!: number;
	topicId!: number;
}

export class Lesson {
	_id!: number;
	lessonTitle!: string;
	lessonAuthor!: string;
	lessonMission!: LessonMission[];
	lessonContent!: LessonContent[];
}

export class LessonMission {
	id!: number;
	description!: string;
}

export class LessonContent {
	lessonTitle!: string;
	subTitle!: LessonSubTitle[];
}

export class LessonSubTitle {
	name!: string;
	lessonLink!: string;
	lessonType!: string;
}

export class Student {
	userId!: number;
	firstName!: string;
	lastName!: string;
	password!: string;
	email!: string;
	userName!: string;
	userCourseId!:string;
	userCourseName!:string;
	enrolledCourses!: [];
}

export class Tutor {
	tutorId!: string;
	firstName!: string;
	lastName!: string;
	tutorAddress!: string;
	tutorBio!: string;
	tutorEmail!: string;
	tutorImage!: string;
}

export class UserSession {
	nextScreen!: string;
	courseId: any;
	didSearch!: boolean;
	enrolledContents: any;
	searchedContents: any;
	loggedStatus!: boolean;
	webCourse!: WebCourse;
	selectedWebCourse!: WebAvailableCourse;
	loggedStudent!:Student;
	tutor!: Tutor;
	scheduleCourse!: ScheduleCourse;
}

export class TreeData {
	label!: string;
	data!: string;
	expandedIcon!: string;
    collapsedIcon!: string;
	children!: Children[];
	expanded!: boolean;
}

export class Children {
	label!: string;
	data! : string;
	expandedIcon!: string;
    collapsedIcon!: string;
	expanded!:boolean;
	icon!: string;
}

export class WebCourse { // mapped with mongodb 
	subjectId! : number;
	name!: string;
	availableCourses!: WebAvailableCourse[];
}

export class WebAvailableCourse { // mongodb availablecourses
	courseId!: number;
	courseIntroduction!: string;
	available!:boolean;
	courseName!: string;
	courseObjective!: string;
	duration!: string;
	courseInstruction!: string;
	tutorId!: string;
	courseType!: string;
	courseSize!: number;
	courseFee!: number;
	tutor!:Tutor;
	tags!: string[];
	webCourseSchedule!: WebCourseSchedule[];
}

/*export class SendMessageObject {
	student!: Student;
	sentMailTo!: string;
	selectedCourseDesc!: string;
	selectedCourseId!: number;
	requestedInfo!:string;
}*/

export class APIResponseObject {
	msgReturned: string = "";
	apiResponse!: string; // STATUS_SUCCESS/ STATUS_FAIL
	loginSuccess: boolean = false;
	addContentToUserSuccess: boolean = false;
	student!: Student;
	tutor!: Tutor;
	scheduleCourse!: ScheduleCourse[];
}

export class UserCourse { // table usercourse
	userId!: number;
	courseId!: number;
	userName!: string
}

export class ScheduleCourse { // table schedulecourse in mysql
	subjectId!: number;
	scheduleId!: number;
	courseId!: number;
	userId!: number;
	tutorId!: string;
	scheduleDate!: string;
	scheduleDateId!:number; 
	tutorFName!: string;
	tutorLName!: string;
	courseName!: string;
	webCourseScheduleList!: WebCourseSchedule[];
	courseFee!: number;
}

export class RequestObject {
	webCourseSearchCriteria!: string;
	courseDescription!: string;
	tutorId!: string;
}

export class WebCourseSchedule {
	webCourseScheduleDate !: any;
	webCourseStudentList !: Student[];
	webCourseOfferNumber !: number;
}

export class CheckoutCourse {
	student!: Student;
	webCourseId!: number;
	webScheduleId!:number;
	subjectId!: NumberConstructor;
	price!: number;
}

export class CreditCardRequestObject {
	token!: any;
	price!: any;
	description!: any;
	currency!: any
}