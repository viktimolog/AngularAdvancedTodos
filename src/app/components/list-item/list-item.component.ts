import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Task } from "../../models/Task";
import { JsonplaceholderService } from "../../services/jsonplaceholder.service";

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})

export class ListItemComponent implements OnInit {
  @Input() task: Task;
  @Output() delete = new EventEmitter();
  @Output() toggle = new EventEmitter();
  @Output() edit = new EventEmitter();

  constructor(public server: JsonplaceholderService) { }

  ngOnInit() {
  }

  //Delete Task
  deleteTask(){
      //Generate event
      this.delete.emit(this.task.id);
  }

  //Toggle Task
  toggleTask(){
      //Generate event
      this.toggle.emit(this.task);
  }

  //Edit Task
  editTask(){
      this.edit.emit({...this.task});
  }
}
