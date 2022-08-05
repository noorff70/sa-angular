import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommunicationService } from 'src/app/services/common/communication.service';
import { UserSession } from '../models/model';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
	
	showDialog: any;
	currentSession!: UserSession;

  constructor( public router: Router,
	private comService: CommunicationService) { }

  ngOnInit() {
  }

  contactUs() {
	this.currentSession = JSON.parse(localStorage.getItem('usersession')!);
	this.currentSession.nextScreen= '<app-about>';
	this.comService.changeScreen(this.currentSession);
    //this.showDialog = true
  }
}
