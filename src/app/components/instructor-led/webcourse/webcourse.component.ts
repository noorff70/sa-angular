import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommunicationService } from 'src/app/services/common/communication.service';
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
    scheduleCourse.tutorId = this.currentSession.selectedWebCourse.tutor.tutorId;
    

    // service call TODO addStudentToScheduledCourse
    for (let i=0; i< this.returnValue.scheduleCourse.length; i++) {
      if (this.scheduleDate === this.returnValue.scheduleCourse[i].schedule){
        scheduleCourse.scheduleId = this.returnValue.scheduleCourse[i].scheduleId;
      }
    }
    
  }

  closeLoggedModal () {
    this.isLogged = false;
  }

}
