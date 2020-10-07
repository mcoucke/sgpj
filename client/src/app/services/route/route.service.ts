import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  private _subject = new Subject<string>();

  sendRoute(route: string) {
    this._subject.next(route);
  }

  getRoute(): Observable<string> {
    return this._subject.asObservable();
  }
}
