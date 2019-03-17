import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JsonplaceholderService {
  configUrl = 'https://jsonplaceholder.typicode.com/todos/';

  constructor(public http: HttpClient) { }

  getTasks(){
      return this.http.get(this.configUrl);
  }

  deleteTask(id: number){
      return this.http.delete(this.configUrl + id.toString());
  }

  toggleTask(data: object){
      return this.http.patch(this.configUrl + data.id.toString()
          , {
          completed: !data.completed
      });
  }
}
