import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { throwError } from 'rxjs/internal/observable/throwError';
import { CreditCardRequestObject } from 'src/app/components/models/model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private REST_API_SERVER = environment.apiUrl;
  private stripejsUrl = 'https://js.stripe.com/v3/';

  private headers = new HttpHeaders();


  constructor(private http: HttpClient) {
    this.headers.append('Content-Type', 'application/json; charset=utf-8');
    this.headers.append("Access-Control-Allow-Origin", "*")
 //   this.headers.set("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS")
//header.Add("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With")
   }

  public initializeStripe() {
    return new Observable((observer) => {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = this.stripejsUrl;
      script.onload = () => {
        observer.next();
        observer.complete();
      };
      document.head.appendChild(script);
    //  document.getElementsByTagName('head')[0].appendChild(script);
    });
  }

  // add a new course to student profile
  /*checkout1(token:string) {

    //const headers = new HttpHeaders({'token': token, 'amount': '100'});

		return this.http.post(this.REST_API_SERVER + `/mongo/creditcard/checkout`, {}, {headers:this.headers})
			.pipe(catchError(this.handleError));
	}*/

  

  public checkout(cardToken: any, price: number, currency:any, description:any) {

    let creditCardObject = new CreditCardRequestObject();
    creditCardObject.token = cardToken.id;
    creditCardObject.currency = currency;
    creditCardObject.price = price;
    cardToken.description = description;

    return this.http.post(this.REST_API_SERVER + `/mongo/creditcard/checkout`, creditCardObject, { headers: this.headers });
  }

  handleError(error: HttpErrorResponse) {
		let errorMessage = 'Unknown error!';
		if (error.error instanceof ErrorEvent) {
			// Client-side errors
			errorMessage = `Error: ${error.error.message}`;
		} else {
			// Server-side errors
			errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
		}
		return throwError(errorMessage);
	}
}
