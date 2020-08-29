import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http : HttpClient) { }

  getDay(date : string) {
    return this.http.get<Object[]>("http://localhost:8080/day/" + date);
  }


}
