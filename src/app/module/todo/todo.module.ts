import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TodoRoutingModule } from './todo-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TasksComponent } from './component/tasks/tasks.component';
import { HeaderComponent } from './component/header/header.component';



@NgModule({
  declarations: [
    HomeComponent,
    TasksComponent,
    HeaderComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    TodoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: []
})
export class TodoModule { }
