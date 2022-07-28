import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isUserLoggedIn: any;

  constructor() { 
    this.isUserLoggedIn = JSON.parse(localStorage.getItem("currentUser") as any);    
  }

  isLoggedIn() {
    if(this.isUserLoggedIn){
      return true;
    }
    else{
      return false;
    }
  }
}
