import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CreateTodoComponent } from './components/create-todo/create-todo.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { AboutComponent } from './components/about/about.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {
    path:'todo-list',component:TodoListComponent,
    //children:[
    //  {
    //    path:'todo',component:CreateTodoComponent
    //  }
    //]
  },
  {
    path:'todo', component:CreateTodoComponent
  },
  {path:'about',component:AboutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
