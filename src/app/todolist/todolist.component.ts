import { CommonModule } from "@angular/common";
import { Component } from '@angular/core';
import { FormControl, FormsModule, NgForm } from '@angular/forms';


type ITask = {
  taskName: string,
  isCompleted: boolean
}
@Component({
  selector: 'app-todolist',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './todolist.component.html'
})
export class TodolistComponent {
  task: string = ""
  taskList: ITask[] = [];
  totalTasks: number = 0;


  addTask(form: NgForm) {
    if (form.controls['task'].value.trim() === "") {
      return;
    }
    this.taskList.push({
      taskName: form.controls['task'].value,
      isCompleted: false,
    });
    form.resetForm();
    this.updateRemaningtasks();
  }

  updateRemaningtasks() {
    this.totalTasks = this.taskList.length;
  }

}
