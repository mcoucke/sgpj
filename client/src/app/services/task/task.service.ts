import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Task } from 'src/app/models/task.model';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { NumberValueAccessor } from '@angular/forms';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http : HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }

  getDay(date : string) {
    return this.http.get<Object[]>("http://localhost:8080/day/" + date)
      .pipe(
        // retry(3),
        catchError(this.handleError)
      );
  }

  getWeek(date : string) {
    return this.http.get<Object[]>("http://localhost:8080/week/" + date)
      .pipe(
        // retry(3),
        catchError(this.handleError)
      );
  }

  addTask(description : string, duration : number, date : Date): Observable<Task> {
    return this.http.post<Task>("http://localhost:8080/day/", {description, duration, date}, httpOptions)
      .pipe(
        // retry(3),
        catchError(this.handleError)
      );
  }


}
