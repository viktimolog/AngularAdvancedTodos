import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../models/Task';
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";

@Injectable({
  providedIn: 'root'
})
export class JsonplaceholderService {
  configUrl = 'https://jsonplaceholder.typicode.com/todos/';

  //Add new task
  private taskSource = new BehaviorSubject<Task>({id: 0, title: '', userId:0, completed: false });
  newTask = this.taskSource.asObservable();

  private taskCountSource = new BehaviorSubject(200);
  taskCount = this.taskCountSource.asObservable();

  //Edit task
  private editTaskSource = new BehaviorSubject<Task>({id: 0, title: '', userId:0, completed: false });
  editingTask = this.editTaskSource.asObservable();

  //Update task
  private updateTaskSource = new BehaviorSubject<Task>({id: 0, title: '', userId:0, completed: false });
  updatingTask = this.updateTaskSource.asObservable();

  constructor(public http: HttpClient) { }

  emitNewTask(task: Task){
      this.taskSource.next(task);
  }

  emitEditTask(task: Task){
      this.editTaskSource.next(task);
  }

  emitUpdateTask(task: Task){
      this.updateTaskSource.next(task);
  }

  updateCount(length: number){
      this.taskCountSource.next(length);
  }

  getTasks(){
      return this.http.get(this.configUrl);
  }

  addTask(task: Task){
      return this.http.post(this.configUrl, {body: task});
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

  editTask(task: Task){
      return this.http.put(this.configUrl + task.id.toString()
          , {
              body: task
      });
    }
}
