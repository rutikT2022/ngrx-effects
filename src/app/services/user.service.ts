import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterUserData } from '../module/authentication/models/register.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }
  baseUrl = 'http://localhost:3000/'

  getAll() {
    return this.http.get<RegisterUserData[]>(`${this.baseUrl}register`);
  }

  getById(id: number) {
    return this.http.get(`${this.baseUrl}register` + id);
  }

  register(user: RegisterUserData) {
    return this.http.post(`${this.baseUrl}register`, user);
  }

  update(user: RegisterUserData) {
    return this.http.put(`${this.baseUrl}register` + user.id, user);
  }

  delete(id: number) {
    return this.http.delete(`${this.baseUrl}register` + id);
  }
}
