import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { ParentComponent } from './components/parent/parent.component';
import { HomeComponent } from './components/home/home.component';
import { AppRoutingModule } from './app.routing.module';
import { LessonComponent } from './components/lesson/lesson.component';

import {TreeModule} from 'primeng/tree';
import {PanelModule} from 'primeng/panel';
import {DialogModule} from 'primeng/dialog';
import { RegisterComponent } from './components/register/register.component';
import { AboutComponent } from './components/about/about.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { EnrolcourseComponent } from './components/enrolcourse/enrolcourse.component';
import { WebcourseComponent } from './components/instructor-led/webcourse/webcourse.component';
import { YouTubePlayerModule } from "@angular/youtube-player";
import { AvailablecoursesComponent } from './components/instructor-led/availablecourses/availablecourses.component';
import { WebcoursecheckoutComponent } from './components/instructor-led/webcoursecheckout/webcoursecheckout.component';
import { WebcourseregisterComponent } from './components/instructor-led/webcourseregister/webcourseregister.component';


@NgModule({
  declarations: [
	AppComponent,
	HomeComponent,
	HeaderComponent,
	FooterComponent,
	LoginComponent,
	LessonComponent,
	ParentComponent,
	RegisterComponent,
	AboutComponent,
	EnrolcourseComponent,
	WebcourseComponent,
	AvailablecoursesComponent,
	WebcoursecheckoutComponent,
	WebcourseregisterComponent
  ],
  imports: [
	BrowserModule,
	AppRoutingModule,
	HttpClientModule,
	FormsModule,
	BrowserAnimationsModule,
	//MatVideoModule,
	TreeModule,
	PanelModule,
	DialogModule,
	FormsModule,
    ReactiveFormsModule,
	YouTubePlayerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
