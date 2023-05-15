import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommunicationService } from 'src/app/services/common/communication.service';
import { RestService } from 'src/app/services/rest/rest.service';
import { WebAvailableCourse, Course, ScheduleCourse, SendMessageObject, Student, Tutor, UserSession } from '../../models/model';

@Component({
  selector: 'app-webcourse',
  templateUrl: './webcourse.component.html',
  styleUrls: ['./webcourse.component.css']
})
export class WebcourseComponent implements OnInit {

  path: any;
  alttext: any;
  currentSession!: UserSession;
  loggedUser!: string;
  avaliableCourse!: WebAvailableCourse[];
  courseSelectedId!: any;
  courseSelected!: WebAvailableCourse;
  openMessageModal!: boolean;
  openScheduleModal!: boolean;
  formGroup!: FormGroup;
  student!: Student;
  sendMessageObject!: SendMessageObject;
  returnValue!: any;
  availableDates!: string[];
  isLogged: boolean = false;
  scheduleDate!: Date;
  registerStatus!: string;

  constructor(
    private comService: CommunicationService,
   // private restService: RestService,
    private formBuilder: FormBuilder,
 
  ) {
    this.avaliableCourse = [];
    this.comService.userSession$.subscribe((session: any) => {
      this.currentSession = session;
      if (this.currentSession.webCourseList !== undefined) {
        this.avaliableCourse = this.currentSession.webCourseList.availableCourses;
        if (this.currentSession.selectedWebCourse !== undefined) {
          this.courseSelectedId = this.currentSession.selectedWebCourse.courseId
        }
        
        for (let i = 0; i < this.avaliableCourse.length; i++) {
          if (this.courseSelectedId === this.avaliableCourse[i].courseId) {
            this.courseSelected = this.avaliableCourse[i];
            break;
          }
        }
      }
    })
  }

  ngOnInit() {
    this.path = "../assests/images/instructor/clientsidewebtech.jpg";
    this.alttext = "web technology";

    this.formGroup = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      senderEmail: ['', Validators.required],
      requestedInfo: ['', Validators.required],
    });

  }

  get f() { return this.formGroup.controls; }

  requestInfo() {
    this.openMessageModal = true;
  }

  closeModal() {
    this.openMessageModal = false;
  }

  requestSchedule() {
    this.openScheduleModal = true;
  }

  closeScheduleModal() {
    this.openScheduleModal = false;
  }

 /* sendRequest() {
    this.sendMessageObject = new SendMessageObject();
    this.student = this.currentSession.loggedStudent;
    if (this.student === undefined) {
      this.student = new Student();
    }
    this.student.firstName = this.formGroup.value.firstName;
    this.student.lastName = this.formGroup.value.lastName;
    this.student.email = this.formGroup.value.senderEmail;

    this.sendMessageObject.student = this.student;
    this.sendMessageObject.sentMailTo = "studyaid.ca@gmail.com";
    this.sendMessageObject.selectedCourseId = this.courseSelectedId;
    this.sendMessageObject.requestedInfo = this.formGroup.value.requestedInfo;
    this.sendMessageObject.selectedCourseDesc = this.courseSelected.courseName;

    this.restService.sendEmail(this.sendMessageObject).subscribe(data => {
      this.returnValue = data;
      if (this.returnValue === true) {
        this.openMessageModal = false;
      }
    })
  } */

  getSchedule() {
    this.availableDates = [];
    if (this.currentSession.loggedStatus === undefined) {
      this.isLogged = true;
      return;
    } else {
      this.isLogged = false;
    }

    let course: Course = new Course;
    course.courseId = this.currentSession.selectedWebCourse.courseId

    if (this.currentSession.selectedWebCourse.webCourseSchedule!= null ) {
      for (let i=0; i<this.currentSession.selectedWebCourse.webCourseSchedule.length; i++ ) {
        this.availableDates.push(this.currentSession.selectedWebCourse.webCourseSchedule[i].webCourseScheduleDate);
      }
    }
    this.openScheduleModal = true
/*
    this.mysqlService.getSchedule(course).subscribe(data => {
      this.returnValue = data;
      this.availableDates = [];
      let tutor = new Tutor();
      this.currentSession.tutor = this.returnValue.tutor;
      if (this.returnValue.scheduleCourse != null && this.returnValue.scheduleCourse.length > 0) {
        this.currentSession.tutor.tutorId = this.returnValue.scheduleCourse[0].tutorId;
      }

      if (this.returnValue.scheduleCourse != null && this.returnValue.scheduleCourse.length > 0) {
        for (let i = 0; i < this.returnValue.scheduleCourse.length; i++) {
          this.availableDates.push(this.returnValue.scheduleCourse[i].schedule);
        }
      }

      this.openScheduleModal = true
    });*/
  }

  selectDate(event: any) {
    this.scheduleDate = event;
    console.log('selected date: ' + event);
  }

  registerSchedule () {
    let scheduleCourse = new ScheduleCourse();
    scheduleCourse.scheduleDate = this.scheduleDate;
    scheduleCourse.courseId = this.currentSession.selectedWebCourse.courseId;
    scheduleCourse.userId = this.currentSession.loggedStudent.userId;
    scheduleCourse.tutorId = this.currentSession.tutor.tutorId;
    
    for (let i=0; i< this.returnValue.scheduleCourse.length; i++) {
      if (this.scheduleDate === this.returnValue.scheduleCourse[i].schedule){
        scheduleCourse.scheduleId = this.returnValue.scheduleCourse[i].scheduleId;
      }
    }
/*
    this.mysqlService.registerSchedule(scheduleCourse).subscribe(data => {
      
      let status: any = data;
      if (status.msgReturned !== undefined) {
        this.registerStatus = status.msgReturned;
      }
    })*/
    
  }

  closeLoggedModal () {
    this.isLogged = false;
  }

}
