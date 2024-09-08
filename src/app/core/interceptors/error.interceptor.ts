import { Injectable } from "@angular/core";
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
	HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
	constructor() {}
	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
	return next.handle(request).pipe(
		catchError((error: HttpErrorResponse) => {
		  // Extract error message
		  const errorMsg = error.error.message || error.statusText || 'An unexpected error occurred';
  
		  // Optionally, you can handle different status codes here
		  switch (error.status) {
			case 400:
			  console.log(errorMsg, 'Bad Request');
			  break;
			case 401:
			  console.log(errorMsg, 'Unauthorized');
			  break;
			case 403:
			  console.log(errorMsg, 'Forbidden');
			  break;
			case 404:
			  console.log(errorMsg, 'Not Found');
			  break;
			case 500:
			  console.log(errorMsg, 'Internal Server Error');
			  break;
			default:
			  console.log(errorMsg, 'Error');
			  break;
		  }
  
		  // Optionally log the error for debugging purposes
		  console.error('HTTP Error:', error);
  
		  // Forward the error to the caller
		  return throwError(() => new Error(errorMsg));
		})
	  );
}
}