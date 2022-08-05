import { Component, OnInit } from '@angular/core';
import { CommunicationService } from 'src/app/services/common/communication.service';
import { UserSession } from '../models/model';
import { RestService } from 'src/app/services/rest/rest.service';


@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	searchContent!: string;
	contents: any;
	currentSession!: UserSession;
	rows!: number;
	screenChange: any;
	previousSession!: UserSession;
	searchedContents: any;
	enrolledContents: any;

	constructor(
		private comService: CommunicationService,
		private restService: RestService
	) {

		this.comService.userSession$.subscribe( session => {
			this.currentSession = session;
			this.enrolledContents = session.enrolledContents;
			this.searchedContents = session.searchedContents;
			this.loadContents();
		})
	}

	ngOnInit() {
		this.loadContents()
	}

	loadContents() {
		//this.currentSession = JSON.parse(localStorage.getItem('usersession'));
		if (this.currentSession == null) {
			this.getDefaultContents();
		}
		if (this.currentSession != null) {
			if (this.currentSession.loggedStatus === true && this.currentSession.didSearch !== true) {
				this.contents = this.currentSession.enrolledContents;
			} else {
				this.contents = this.currentSession.searchedContents;
			}
			
			if (this.contents !== undefined) { 
				this.rows = this.contents.length / 3;
				if (this.rows % 3 > 0) {
					this.rows++;
				}
			}
			//check for enrolled 
		}// end of if
	}


	selectContent(contentId: any) {
		this.currentSession.contentId = contentId;
		this.currentSession.nextScreen = '<app-lesson>';
		this.comService.changeScreen(this.currentSession);
	}

	getDefaultContents() {
		this.restService.getContentList('java').subscribe(data => {
			this.currentSession = new UserSession();
			this.currentSession.searchedContents = data;
			this.contents = data;
		});
	}
}