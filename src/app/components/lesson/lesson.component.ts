import { Component, OnInit, Input } from '@angular/core';
import { UserSession, LessonContent, TreeData, Children, Student, UserAccessReturnObject } from '../models/model';
import { TreeNode } from 'primeng/api';
import { CommunicationService } from 'src/app/services/common/communication.service';
import { RestService } from 'src/app/services/rest/rest.service';
import { DbService } from 'src/app/services/db/db.service';
import { MongoService } from 'src/app/services/mongo/mongo.service';


@Component({
	selector: 'app-lesson',
	templateUrl: './lesson.component.html',
	styleUrls: ['./lesson.component.css']
})
export class LessonComponent implements OnInit {

	courseId: any;
	lessons: any;
	currentSession!: UserSession;
	lessonContents: LessonContent[];
	lessonMission: any[];
	treeNode: TreeNode[];
	treeData: TreeData[];
	url!: string;
	enrollButton: boolean;
	dialogValue!: string;
	isSelectedContentEnrolled: boolean = false;
	@Input('openModal')
	openModal!: boolean;
	returnedObject!: any;

	constructor(
		private comService: CommunicationService,
		private restService: RestService,
		private dbService: DbService,
		private mongoService: MongoService

	) {
		this.lessonContents = [];
		this.lessonMission = [];
		this.treeNode = [];
		this.treeData = [];
		this.enrollButton = true;
		this.comService.userSession$.subscribe( session => {
			this.currentSession = session;
		})
	}

	ngOnInit() {
		this.loadLesson();
	}
	
	loadLesson() {
		this.courseId = this.currentSession.courseId;
		this.lessonContents = this.currentSession.enrolledContents;
		this.comService.changeScreen(this.currentSession);
		this.isEnrolledForSelectedContent ();
		if (this.currentSession.loggedStatus === true) {
			if (this.isSelectedContentEnrolled === true) {
				this.enrollButton = false; 
			} else { 
				this.enrollButton = true;
			}
		}
		this.getLessons();
	}


	getLessons() {
		this.mongoService.getLessonByContentId(this.courseId).subscribe(data => {
			this.lessons = data;
			this.lessonContents = this.lessons.lessonContent;
			this.lessonMission = this.lessons.lessonMission;
			this.convertToTreeData1();
		});
	}
	openVideo() {
		//this.videoLink = this.url;
		//console.log('openVideo(): ' + this.videoLink);
	}

	convertToTreeData1() {
		this.isEnrolledForSelectedContent();

		for (let i = 0; i < this.lessonContents.length; i++) {

			// the main node
			this.treeNode.push({
				label: this.lessonContents[i].lessonTitle,
				expandedIcon: "pi pi-folder-open",
				collapsedIcon: "pi pi-folder",
				expanded: true,
				data: ''
			})

			//get the children  of that node
			const childList : Children[]= [];
			if (this.lessonContents[i].subTitle.length > 0) {
				for (let j = 0; j < this.lessonContents[i].subTitle.length; j++) { // inner for
					const child = new Children();
					child.label = this.lessonContents[i].subTitle[j].name;
					if (this.currentSession.loggedStatus === undefined || this.currentSession.loggedStatus=== false) {
						child.data = 'loginfirst'
					}else {
						child.data = this.lessonContents[i].subTitle[j].lessonLink;
					}
					child.icon = 'pi pi-play';
					childList.push(child);
				}
			}
			this.treeNode[i].children = childList;
		}


	}


	convertToTreeData() {
		this.isEnrolledForSelectedContent();
		
		for (let i = 0; i < this.lessonContents.length; i++) {
			const tData = new TreeData();
			tData.children = [];
			tData.label = this.lessonContents[i].lessonTitle;
			if (this.lessonContents[i].subTitle.length > 0) {
				for (let j = 0; j < this.lessonContents[i].subTitle.length; j++) { // inner for
					const child = new Children();
					child.label = this.lessonContents[i].subTitle[j].name;
					if ( this.isSelectedContentEnrolled == false) {
						if (this.isSelectedContentEnrolled === false) {
							child.data = 'loginfirst' + this.lessonContents[i].subTitle[j].lessonLink;
							child.icon = '';
						} else {
							child.data = this.lessonContents[i].subTitle[j].lessonLink;
							child.icon = 'pi pi-play';
						}
					}
					 else {
						child.data = this.lessonContents[i].subTitle[j].lessonLink;
						child.icon = 'pi pi-play';
					}
					tData.children.push(child);
				} // end of inner for
			} // end of if statement
			this.treeData.push(tData);
		} // end of first for
		this.converttoTreeNode();
	} // end of converttotreedata

	converttoTreeNode() {

		// make the root folder open
		for (let i = 0; i < this.treeData.length; i++) {
			this.treeNode.push({
				label: this.treeData[i].label,
				expandedIcon: 'pi pi-folder-open',
				collapsedIcon: 'pi pi-folder',
				expanded: true,
				children: this.treeData[i].children
			})
		}
		console.log();
		/*for (let i = 0; i < this.treeData.length; i++) {
			if (i == 0) {
				this.treeNode.push({
					label: this.treeData[i].label,
					expandedIcon: 'pi pi-folder-open',
					collapsedIcon: 'pi pi-folder',
					expanded: true,
					children: this.treeData[i].children
				})
			} else {
				this.treeNode.push({
					label: this.treeData[i].label,
					expandedIcon: 'pi pi-folder-open',
					collapsedIcon: 'pi pi-folder',
					expanded: false,
					children: this.treeData[i].children

				})
			}
		}*/
	}

	nodeSelect(event:any) {
		if (!event.node.data.includes("login")) {
			this.url = event.node.data;
		}
		
	}
	
	enrolCourse(){
		
		if(this.currentSession.loggedStudent === undefined) {
			this.openModal = true;
			this.dialogValue = 'Please register/ login first';
			return;
		} else if (this.currentSession.loggedStudent.userName != null) {
			// this.dialogValue = 'You are already enrolled for this course';
			// this.showDialog = true;
		}
		
		this.dbService.addContentForStudent(this.currentSession.loggedStudent.userId, this.currentSession.courseId)
			.subscribe (data => {
				this.returnedObject = data;

				let student = new Student();
				student.userId = this.currentSession.loggedStudent.userId;

				if (this.returnedObject.addContentToUserSuccess === true) {
					this.isSelectedContentEnrolled = true;
					this.enrollButton = false;
					this.reloadContents();
				}
			})
	}
	
	isEnrolledForSelectedContent () {
		if ( this.currentSession.loggedStudent !== undefined  && this.currentSession.loggedStudent.enrolledCourses !== undefined) {
			for (let i=0; i< this.currentSession.loggedStudent.enrolledCourses.length; i++) {
				let seletedCourse :any = this.currentSession.loggedStudent.enrolledCourses[i]
			if (seletedCourse.courseId === this.courseId){
				this.isSelectedContentEnrolled = true;
				return;
			}
		}
		this.isSelectedContentEnrolled = false;
		}
	}
	
	closeModal() {
		this.openModal = false;
	}

	// after login success
	reloadContents() {
		for (let i = 0; i < this.treeData.length; i++) {
			if (this.treeData[i].children !== null) {
				let child = this.treeData[i].children;
				for (let j=0; j< child.length; j++) {
					let temp = this.treeData[i].children[j].data.substring(10);
					this.treeData[i].children[j].data = temp;
					this.treeData[i].children[j].icon = 'pi pi-play';
				}
			}
		} 
	}
}