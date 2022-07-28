import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from './guard/auth.service';
import { LoginComponent } from './module/authentication/component/login/login.component';

const routes: Routes = [
  {
    path: "login",
    loadChildren: () => import('./module/authentication/authentication.module').then((m) => m.AuthenticationModule),
  },
  {
    path: "task",
    loadChildren: () => import('./module/todo/todo.module').then((m) => m.TodoModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthService]
})
export class AppRoutingModule { }
