import { Component, OnInit } from '@angular/core';
import { CommunicationService } from 'src/app/services/common/communication.service';
import { MongoService } from 'src/app/services/mongo/mongo.service';
import { UserSession } from '../../models/model';

@Component({
  selector: 'app-webcoursecheckout',
  templateUrl: './webcoursecheckout.component.html',
  styleUrls: ['./webcoursecheckout.component.css']
})
export class WebcoursecheckoutComponent implements OnInit {

  userSession!: UserSession;

  constructor(
		private comService: CommunicationService,
		private mongoService: MongoService
	) {
		this.comService.userSession$.subscribe( session => {
			this.userSession = session;

		})
	 }

  ngOnInit(): void {
  }

}
