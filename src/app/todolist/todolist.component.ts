import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

type ITask = {
  taskName: string;
  isCompleted: boolean;
};
@Component({
  selector: 'app-todolist',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './todolist.component.html',
})
export class TodolistComponent implements OnInit {
  //INITIAL STATE
  currentYear: number | null = null;
  task: string = '';
  taskList: ITask[] = [];
  completedTaskList: ITask[] = [];
  totalTasks: number = 0;
  totalCompletedTasks: number = 0;

  constructor() {
    this.taskList = JSON.parse(localStorage.getItem('taskList') || '[]');
    this.completedTaskList = JSON.parse(
      localStorage.getItem('completedTaskList') || '[]',
    );

    this.updateTotalRemaningTasks();
    this.updateTotalCompletedTasks();
  }
  ngOnInit(): void {
    this.currentYear = new Date().getFullYear();
  }

  // ADD TASK
  addTask(form: NgForm) {
    if (form.controls['task'].value.trim() === '') {
      return;
    }
    this.taskList.push({
      taskName: form.controls['task'].value,
      isCompleted: false,
    });
    localStorage.setItem('taskList', JSON.stringify(this.taskList));
    this.task = '';
    this.updateTotalRemaningTasks();
  }

  // DELETE TASK
  deleteTask(index: number) {
    console.log(index);
    this.taskList.splice(index, 1);
    localStorage.setItem('taskList', JSON.stringify(this.taskList));
    this.updateTotalRemaningTasks();
  }

  // CHECK TO COMPLETE TASK
  onCheck(index: number) {
    this.taskList[index].isCompleted = !this.taskList[index].isCompleted;
    this.updateCompletedTasks(index);
    this.updateTotalRemaningTasks();
    localStorage.setItem('taskList', JSON.stringify(this.taskList));
    localStorage.setItem(
      'completedTaskList',
      JSON.stringify(this.completedTaskList),
    );
  }

  // DELETE COMPLETED TASK
  deleteCompletedTask(index: number) {
    this.completedTaskList.splice(index, 1);
    this.updateTotalRemaningTasks();
    this.updateTotalCompletedTasks();
    localStorage.setItem(
      'completedTaskList',
      JSON.stringify(this.completedTaskList),
    );
  }

  // UNCHECK COMPLETED TASK TO TASK
  unCheckCompletedTask(index: number) {
    this.taskList.push(this.completedTaskList[index]);
    this.completedTaskList.splice(index, 1);
    this.updateTotalRemaningTasks();
    this.updateTotalCompletedTasks();
    localStorage.setItem(
      'completedTaskList',
      JSON.stringify(this.completedTaskList),
    );
  }

  // DELETE ALL COMPLETED TASKS
  deleteAllCompleted() {
    this.completedTaskList = [];
    this.updateTotalCompletedTasks();
    localStorage.setItem(
      'completedTaskList',
      JSON.stringify(this.completedTaskList),
    );
  }

  // UPDATE TO COMPLETED TASKS
  private updateCompletedTasks(index: number) {
    this.completedTaskList.push(this.taskList[index]);
    this.taskList.splice(index, 1);
    this.updateTotalCompletedTasks();
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
