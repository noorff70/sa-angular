import { Injectable } from '@angular/core';
import { Subject, ReplaySubject } from 'rxjs';
import { UserSession} from 'src/app/components/models/model';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

	userSession = new ReplaySubject<UserSession>();
	userSession$ = this.userSession.asObservable();

	content = new ReplaySubject<any>();
	content$ = this.content.asObservable();

  constructor() { }

  changeScreen(sc: UserSession ) {
	this.userSession.next(sc);
  }

  changeContent(id: any) {
	this.content.next(id);
   }
}

export function MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}
