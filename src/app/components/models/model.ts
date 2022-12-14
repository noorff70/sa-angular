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
	tutorId!: number;
	firstName!: string;
	lastName!: string;
	tutorAddress!: string;
}

export class UserSession {
	nextScreen!: string;
	courseId: any;
	didSearch!: boolean;
	enrolledContents: any;
	searchedContents: any;
	loggedStatus!: boolean;
	webCourseList!: any;
	selectedWebCourse!: AvailableCourse;
	loggedStudent!:Student;
	tutor!: Tutor;
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
	availableCourses!: AvailableCourse[];
}

export class AvailableCourse { // mongodb availablecourses
	courseId!: number;
	courseIntroduction!: string;
	available!:boolean;
	courseName!: string;
	courseObjective!: string;
	duration!: string;
	courseInstruction!: string;
	tags!: string[];
}

export class SendMessageObject {
	student!: Student;
	sentMailTo!: string;
	selectedCourseDesc!: string;
	selectedCourseId!: number;
	requestedInfo!:string;
}

export class UserAccessReturnObject {
	msgReturned: string = "";
	success: boolean = false;
	loginSuccess: boolean = false;
	addContentToUserSuccess: boolean = false;
	student!: Student;
	tutor!: Tutor;
	scheduleCourse!: ScheduleCourse[];
}

export class UserCourse { // table usercourse
	userId!: number;
	courseId!: number
}

export class ScheduleCourse { // table schedulecourse in mysql
	scheduleId!: number;
	courseId!: number;
	userId!: number;
	tutorId!: number;
	scheduleDate!: Date 
	tutorFName!: string;
	tutorLName!: string;
	courseName!: string
}