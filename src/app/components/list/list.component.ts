import { Component, OnInit } from '@angular/core';
import { JsonplaceholderService } from "../../services/jsonplaceholder.service";
import { Task } from '../../models/Task';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
    tasks: Task[];

  constructor(
      public server: JsonplaceholderService,
      public flashMessage: FlashMessagesService
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
      this.server.newTask.subscribe((data: Task) => {
          console.log('data = ', data);
          if(data['body']){
              this.tasks.unshift({
                  ...data['body'],
                  id: data.id
              });
              this.server.updateCount(this.tasks.length);
          }
      });
  }

  identify = index => index;

  deleteTask = id => {
      this.server.deleteTask(id).subscribe(res => {
          // this.server.getTasks();
          this.tasks = this.tasks.filter(task => task.id !== id);
          this.server.updateCount(this.tasks.length);
          this.flashMessage.show('Delete success!', {
              cssClass: 'alert-success',
              showCloseBtn: true,
              closeOnClick: true,
              timeout: 3000
          });
      },
          error => {
              this.flashMessage.show(error.message, {
                  cssClass: 'alert-danger',
                  showCloseBtn: true,
                  closeOnClick: true,
                  timeout: 5000
              });
          }
      )
  };

  toggleTask = data => {
      this.server.toggleTask(data).subscribe(taskUpdated => {
          this.tasks = this.tasks.filter(task => task.id !== data.id);
          this.tasks.push(taskUpdated);
      })
    }
}
