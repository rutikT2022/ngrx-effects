import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }

  baseUrl = 'http://localhost:3000/'


  getTasks() {
    return this.http.get(`${this.baseUrl}task`);
  }

  addTask(task: any) {
    return this.http.post(`${this.baseUrl}task`, task);
  }

  editTask(task: any) {
    return this.http.put(`${this.baseUrl}task/${task.id}`, task);
  }

  deleteTask(taskId: any) {
    console.log('deleting task:::', taskId);
    return this.http.delete(`${this.baseUrl}task/${taskId}`);
  }
}