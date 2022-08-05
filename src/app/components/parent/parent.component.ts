import { Component, OnInit } from '@angular/core';
import { CommunicationService } from 'src/app/services/common/communication.service';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {

	screenName!: string;

  constructor(
	  private comService: CommunicationService
  ) {
	  this.comService.userSession$.subscribe(sc => {
      this.screenName = sc.nextScreen;
		});
   }

  ngOnInit() {
	this.screenName = "";
	localStorage.removeItem('usersession');
  }

}
