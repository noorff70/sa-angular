import { Component, OnInit, Input } from '@angular/core';
import { UserSession, LessonContent, TreeData, Children, Student, UserAccessReturnObject } from '../models/model';
import { TreeNode } from 'primeng/api';
import { CommunicationService } from 'src/app/services/common/communication.service';
import { RestService } from 'src/app/services/rest/rest.service';
import { DbService } from 'src/app/services/db/db.service';


@Component({
	selector: 'app-lesson',
	templateUrl: './lesson.component.html',
	styleUrls: ['./lesson.component.css']
})
export class LessonComponent implements OnInit {

	contentId: any;
	lessons: any;
	currentSession!: UserSession;
	lessonContents: LessonContent[];
	lessonMission: any[];
	treeNode: TreeNode[];
	treeData: TreeData[];
	url!: string;
	//insertSuccess: any;
	enrollButton: boolean;
	//showDialog: boolean;
	dialogValue!: string;
	isSelectedContentEnrolled: boolean = false;
	@Input('openModal')
	openModal!: boolean;
	returnedObject!: any;

	constructor(
		private comService: CommunicationService,
		private restService: RestService,
		private dbService: DbService
		
		//private router: Router
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
		this.contentId = this.currentSession.contentId;
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
		this.restService.getLessonByContentId(this.contentId).subscribe(data => {
			this.lessons = data;
			this.lessonContents = this.lessons.lessonContent;
			this.lessonMission = this.lessons.lessonMission;
			this.convertToTreeData();
		});
	}
	openVideo() {
		//this.videoLink = this.url;
		//console.log('openVideo(): ' + this.videoLink);
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
					if (this.lessonContents[i].subTitle[j].lessonType == "0" && this.isSelectedContentEnrolled == false) {
						child.label = this.lessonContents[i].subTitle[j].name;
						if (this.isSelectedContentEnrolled === false) {
							child.data = 'loginfirst' + this.lessonContents[i].subTitle[j].lessonLink;
							child.icon = '';
						} else {
							child.data = this.lessonContents[i].subTitle[j].lessonLink;
							child.icon = 'pi pi-play';
						}
					}
					 else {
						child.label = this.lessonContents[i].subTitle[j].name;
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
		for (let i = 0; i < this.treeData.length; i++) {
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
		}
	}

	nodeSelect(event:any) {
		if (!event.node.data.includes("login")) {
			this.url = event.node.data;
		}
		
	}
	
	enrolCourse(){
		
		if(this.currentSession.loggedStudent.userName == null) {
			this.openModal = true;
			this.dialogValue = 'Please register/ login first';
			return;
		} else if (this.currentSession.loggedStudent.userName != null) {
			// this.dialogValue = 'You are already enrolled for this course';
			// this.showDialog = true;
		}
		
		this.dbService.addContentForStudent(this.currentSession.loggedStudent.userId, this.currentSession.contentId)
			.subscribe (data => {
				this.returnedObject = data;

				let student = new Student();
				student.userId = this.currentSession.loggedStudent.userId;

				if (this.returnedObject.addContentToUserSuccess === true) {
					this.isSelectedContentEnrolled = true;
					this.enrollButton = false;
					this.reloadContents();
				}
				
				//this.restService.getContentListForLoggedUser(student)
				//	.subscribe (data => {
				//		this.currentSession.enrolledContents = data;
				//		this.isSelectedContentEnrolled = true;
				//		this.enrollButton = false;
				//	})
			})
	}
	
	isEnrolledForSelectedContent () {
		if (this.currentSession.enrolledContents !== undefined) {
			for (let i=0; i< this.currentSession.enrolledContents.length; i++) {
			if (this.currentSession.enrolledContents[i].contentId === this.contentId){
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