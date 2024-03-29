// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'https://api.studyaid.ca', // rest endpoint in aws
  //apiUrl: 'http://localhost:8081',
  // apiUrl: 'https://3.12.185.202:8081' //elastic ip
  // apiUrl: 'http://10.0.2.198:8081' // internal ip
  //apiUrl: 'https://172.17.0.1:8081' // internal ip
  stripePublicKey: 'pk_test_51NAjB1GxFE5twCSxwjjzVzEVKPPZCpSHKdJupaOmtIVLXxtmJh2VSyF6aTp48P10AogGCwL7zEM7YgAnn9aWMTzv00GmJRiugp'
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
