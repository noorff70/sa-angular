import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {BrowserModule} from '@angular/platform-browser';
import { ParentComponent } from './components/parent/parent.component';

const routes: Routes = [
  /* default can change later*/
  { path: '', redirectTo: '/studyaid', pathMatch: 'full' },
  {path: 'studyaid', component: ParentComponent},

];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}


