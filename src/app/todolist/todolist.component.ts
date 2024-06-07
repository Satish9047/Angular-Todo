import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormControl, FormsModule, NgForm } from "@angular/forms";


type ITask = {
  taskName: string,
  isCompleted: boolean
}
@Component({
  selector: "app-todolist",
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: "./todolist.component.html"
})
export class TodolistComponent {
  //INITIAL STATE
  task: string = ""
  taskList: ITask[] = [];
  completedTaskList: ITask[] = [];
  totalTasks: number = 0;
  totalCompletedTasks: number = 0;

  // ADD TASK
  addTask(form: NgForm) {
    if (form.controls["task"].value.trim() === "") {
      return;
    }
    this.taskList.push({
      taskName: form.controls["task"].value,
      isCompleted: false,
    });
    this.task = "";
    this.updateTotalRemaningTasks();
  }

  // DELETE TASK
  deleteTask(index: number) {
    console.log(index);
    this.taskList.splice(index, 1);
    this.updateTotalRemaningTasks();
  }

  // CHECK TO COMPLETE TASK
  onCheck(index: number) {
    this.taskList[index].isCompleted = !this.taskList[index].isCompleted;
    this.updateCompletedTasks(index);
    console.log(this.taskList);
    this.updateTotalRemaningTasks()
  }

  // DELETE COMPLETED TASK
  deleteCompletedTask(index: number) {
    this.completedTaskList.splice(index, 1);
    this.updateTotalRemaningTasks();
    this.updateTotalCompletedTasks()

  }

  // UNCHECK COMPLETED TASK TO TASK
  unCheckCompletedTask(index: number) {
    this.taskList.push(this.completedTaskList[index]);
    this.completedTaskList.splice(index, 1);
    this.updateTotalRemaningTasks();
    this.updateTotalCompletedTasks()
  }

  // DELETE ALL COMPLETED TASKS
  deleteAllCompleted() {
    this.completedTaskList = [];
    this.updateTotalCompletedTasks();
  }

  // UPDATE TO COMPLETED TASKS
  private updateCompletedTasks(index: number) {
    this.completedTaskList.push(this.taskList[index]);
    this.taskList.splice(index, 1);
    this.updateTotalCompletedTasks()
    // console.log("completed  task", this.completedTaskList);
  }


  // TOTAL REMANING TASKS
  private updateTotalRemaningTasks() {
    this.totalTasks = this.taskList.length;
  }

  // TOTAL COMPLETED TASKS
  private updateTotalCompletedTasks() {
    this.totalCompletedTasks = this.completedTaskList.length;
  }
}
