import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {BrowserModule} from '@angular/platform-browser';
import { ParentComponent } from './components/parent/parent.component';

const routes: Routes = [
  /* default */
  { path: '', redirectTo: '/easy-learning', pathMatch: 'full' },
  {path: 'easy-learning', component: ParentComponent},

];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}


