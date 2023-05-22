import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  about:boolean = false;
  team:boolean = false;
  contact:boolean = false;
  constructor() { }

  ngOnInit() {
  }

  cTeam () {
    this.team = true;
    this.about = false;
    this.contact = false;
  }

  cAbout () {
    this.team = false;
    this.about = true;
    this.contact = false;
  }

  cContact () {
    this.team = false;
    this.about = false;
    this.contact = true;
  }

}
