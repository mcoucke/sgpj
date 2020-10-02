import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Task } from 'src/app/models/task.model';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private _uri : string = "http://localhost:8080";

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
    let fulluri = this._uri + "/day/" + date;
    return this.http.get<Object[]>(fulluri)
      .pipe(
        // retry(3),
        catchError(this.handleError)
      );
  }

  getWeek(date : string) {
    let fulluri = this._uri + "/week/" + date;
    return this.http.get<Object[]>(fulluri)
      .pipe(
        // retry(3),
        catchError(this.handleError)
      );
  }

  addTask(description : string, duration : number, date : Date): Observable<Task> {
    let fulluri = this._uri + "/day/";
    return this.http.post<Task>(fulluri, {description, duration, date}, httpOptions)
      .pipe(
        // retry(3),
        catchError(this.handleError)
      );
  }

  editTask(id : number, description : string, duration : number, date : Date): Observable<Task> {
    let fulluri = this._uri + "/task/" + id;
    return this.http.put<any>(fulluri, {description, duration, date}, httpOptions)
      .pipe(
        // retry(3),
        catchError(this.handleError)
      );
  }

  deleteTask(id : number) {
    let fulluri = this._uri + "/task/" + id;
    return this.http.delete<any>(fulluri, httpOptions)
      .pipe(
        // retry(3),
        catchError(this.handleError)
      );
  }


}
