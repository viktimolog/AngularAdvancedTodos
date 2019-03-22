import { Component, OnInit, ViewChild } from '@angular/core';
import { JsonplaceholderService } from "../../services/jsonplaceholder.service";
import { Task } from "../../models/Task";
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

    title: string;
    currentTaskId: number;
    isEdit: boolean;
    @ViewChild('form') form;

  constructor(
      public server: JsonplaceholderService,
      public flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
      //Subscribe on edit task
      this.server.editingTask.subscribe((task: Task) => {
          if(task.title){
              this.isEdit = true;
              this.title = task.title;
              this.currentTaskId = task.id;
          }
      });
  }

  addTask(){
      const newTask = {
          id: 0,
          userId: 1,
          title: this.title,
          completed: false
      };

      this.server.addTask(newTask).subscribe((task: Task) => {
            this.form.reset();
            this.server.emitNewTask(task);
            this.flashMessage.show('Success!', {
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
  }
  editTask(){
      const updatedTask = {
          id: this.currentTaskId,
          userId: 1,
          completed: false,
          title: this.title
      };

      this.server.editTask(updatedTask).subscribe((task: Task) => {
          this.form.reset();
          this.server.emitUpdateTask(task);
          this.flashMessage.show('Edit success!', {
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
      );
      this.isEdit = false;
  }
}
