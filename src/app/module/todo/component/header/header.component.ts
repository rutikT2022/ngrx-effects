import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../../state';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isUserLoggedin: any;
  currentUser: any;
  title: string = 'Angular NGRX Example'

  constructor(private readonly store: Store, private router: Router) {
    this.store.select(fromRoot.getLoggedInUser).pipe(
    ).subscribe((data: any) => {
      console.log('in the header:::', data)
      this.currentUser = data.user;
    });
    // get current user
    this.isUserLoggedin = JSON.parse(localStorage.getItem("currentUser") as any);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
  }
}