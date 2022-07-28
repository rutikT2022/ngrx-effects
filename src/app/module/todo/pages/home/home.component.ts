import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import * as fromRoot from '../../../../state';
import * as todoActions from '../../../../state/feature-state/actions/todo.actions';
import { random } from 'lodash';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user: any;
  tasks: any[] = [];
  loggedInUser: any

  constructor(private router: Router, private readonly store: Store) {
    this.store.select(fromRoot.getLoggedInUser).pipe(
    ).subscribe((data: any) => this.user = data.user);
    this.getUpdatedTask()
    // get logged in user from local storage
    this.loggedInUser = JSON.parse(localStorage.getItem("currentUser") as any);
  }

  todoForm = new FormGroup({
    task: new FormControl('', Validators.required),
    assignee: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required)
  });


  onSubmit() {
    console.log(this.todoForm.value);
    const task = {
      createdBy: this.loggedInUser?.username,
      task: this.todoForm.value.task,
      assignee: this.todoForm.value.assignee,
      status: this.todoForm.value.status
    };
    this.store.dispatch(todoActions.createTask({ task }));
    this.todoForm.reset();
    this.store.select(fromRoot.getTasks).pipe(
    ).subscribe((data: any) => {
      console.log("table data", data);
      this.tasks = data.tasks
    });
  }


  deleteTask(taskid: any) {
    if (confirm("Do you want to delete the task?")) {
      console.log('deleting this task:::', taskid);
      this.store.dispatch(todoActions.deleteTask({ taskid }));
      this.getUpdatedTask()
    } else {
      return
    }
  }

  editTask(task: any) {
    console.log('editing this task:::', task);
    this.store.dispatch(todoActions.editTask({ task }));
    this.getUpdatedTask();
  }

  ngOnInit(): void {
  }

  // get updated task list after add, edit and delete task
  getUpdatedTask() {
    this.store.dispatch(todoActions.getTasks())
    this.store.select(fromRoot.getTasks).pipe(
    ).subscribe((data: any) => this.tasks = data.tasks);
  }
}
