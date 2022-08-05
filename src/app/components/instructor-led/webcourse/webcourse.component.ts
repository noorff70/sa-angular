import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommunicationService } from 'src/app/services/common/communication.service';
import { RestService } from 'src/app/services/rest/rest.service';
import { AvailableCourse, SendMessageObject, Student, UserSession } from '../../models/model';

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
  avaliableCourse!: any[];
  courseSelectedId!: any;
  courseSelected!: AvailableCourse;
  openModal!: boolean;
  formGroup!: FormGroup;
  student!: Student;
  sendMessageObject!: SendMessageObject;
  returnValue!: any;

  constructor(
    private comService: CommunicationService,
    private restService: RestService,
    private formBuilder: FormBuilder,

  ) {
    this.avaliableCourse = [];
    this.comService.userSession$.subscribe((session: any) => {
      this.currentSession = session;
      this.avaliableCourse = this.currentSession.webCourseList;
      this.courseSelectedId = this.currentSession.selectedWebCourse;
      //this.initForm();
      for (let i = 0; i < this.avaliableCourse.length; i++) {
        if (this.courseSelectedId === this.avaliableCourse[i].courseId) {
          this.courseSelected = this.avaliableCourse[i];
          break;
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
    this.openModal = true;
  }

  closeModal() {
    this.openModal = false;
  }

  sendRequest() {
    this.sendMessageObject = new SendMessageObject();
    this.student = this.currentSession.loggedStudent;
    if (this.student === undefined) {
      this.student = new Student();
    }
    this.student.studentFName = this.formGroup.value.firstName;
    this.student.studentLName = this.formGroup.value.lastName;
    this.student.studentEmail = this.formGroup.value.senderEmail;

    this.sendMessageObject.student = this.student;
    this.sendMessageObject.sentMailTo = "studyaid.ca@gmail.com";
    this.sendMessageObject.selectedCourseId = this.courseSelectedId;
    this.sendMessageObject.requestedInfo = this.formGroup.value.requestedInfo;
    this.sendMessageObject.selectedCourseDesc = this.courseSelected.courseTitle;

    this.restService.sendEmail(this.sendMessageObject).subscribe(data => {
      this.returnValue = data;
      if (this.returnValue === true) {
        this.openModal = false;
      }
    })
  }

}
