import { Component, OnInit } from '@angular/core';
import { TaskModel } from '../../model/task.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  todos: TaskModel[] = [];
  todosAll: TaskModel[] = [];
  title = 'Todo App';
  task: string;
  todoLength: number = 0;
  firstOpened: Boolean = true;
  private toBeUpdatedTodo: TaskModel;
  private toBeUpdatedTodoId: number;
  constructor() {}

  ngOnInit(): void {
    var storage = localStorage.getItem('listitem');
    if (storage != null && storage != "") {
      this.todos = JSON.parse(localStorage.getItem('listitem'));
      this.todosAll = this.todos;
      this.firstOpened = false;
    }
    this.updateLength();
  }

  // marks all the TODO items as completed
  onClickCheckAll = () => this.todos.forEach((todo: TaskModel) => (todo.isCompleted = true));

  // delete a task
  onClickDelete = (taskId: number) => {
    this.todos.splice(taskId, 1);
    this.lclStorage();
  }

  // add a task
  onClickAdd = () => {
    
    if (this.task && this.task.trim()) {
      this.toBeUpdatedTodo
        ? this.todos.splice(this.toBeUpdatedTodoId, 0, this.toBeUpdatedTodo)
        : this.todos.push({
          isActivated: true,
          task: this.task,
          isCompleted: false,
        });
      this.todosAll = this.todos;
      this.updateLength();
      this.task = null; 
      this.lclStorage();
      this.firstOpened = false;
    }
  };

  //update length
  updateLength = () => {
    this.todoLength = this.todos.length;
  }

  //localstorage
  lclStorage = () => {
    localStorage.setItem('listitem', JSON.stringify(this.todos));
  }

  // set task as completed
  onClickCompleteToggle = (taskId: number) => {
    const todo = this.todos.slice(taskId, taskId + 1)[0];
    todo.isCompleted = todo.isCompleted;
    this.lclStorage();
  };

  //active button
  onClickActive() {
    this.todos = this.todosAll;
    this.todos = this.todos.filter(active => !active.isCompleted);
    this.updateLength();
  }

  //all button
  onClickAll() {
    this.todos = this.todosAll;
    this.updateLength();
  }

  //comleted button
  onClickCompleted() {
    this.todos = this.todosAll;
    this.todos = this.todos.filter(active => active.isCompleted);
    this.updateLength();
  }

  //delete button
  onClickDeleteSelected() {
    this.todos = this.todosAll.filter(active => !active.isCompleted);
    this.todosAll = this.todos;
    this.updateLength();
  }

}
