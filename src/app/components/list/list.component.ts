import { Component, OnInit } from '@angular/core';
import { JsonplaceholderService } from "../../services/jsonplaceholder.service";
import { Task } from '../../models/Task';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
    tasks: Task[];

  constructor(
      public server: JsonplaceholderService
  ) { }

  ngOnInit() {
      this.tasks = this.server.getTasks()
          .subscribe(data => {
              if(data){
                  this.tasks = data;
              }
          },
          error => console.log(error));
      //Subscribe on new task event
      this.server.newTask.subscribe((data: Task)=>{
          console.log('data = ', data);
          if(data['body']){
              this.tasks.unshift({
                  ...data['body'],
                  id: data.id
              });
          }
      });
  }

  identify = index => index;

  deleteTask = id => {
      this.server.deleteTask(id).subscribe(res => {
          // this.server.getTasks();
          this.tasks = this.tasks.filter(task => task.id !== id);
      })
  };

  toggleTask = data => {
      this.server.toggleTask(data).subscribe(taskUpdated => {
          this.tasks = this.tasks.filter(task => task.id !== data.id);
          this.tasks.push(taskUpdated);
      })
    }
}
