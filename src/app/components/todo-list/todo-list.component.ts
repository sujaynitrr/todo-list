import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { TodoListService } from 'src/app/todo-list.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.sass']
})
export class TodoListComponent implements OnInit, OnChanges {
  todoList: any[] = [];

  constructor(private router: Router,private todoListService: TodoListService) { }
  ngOnChanges(changes: SimpleChanges): void {


  }

  ngOnInit(): void {
    this.getTodoList();
  }
  navigateToTodo() {
    this.router.navigate(['/todo']);
  }
  getTodoList(){
    this.todoListService.getTodoList().subscribe({
      next:(response)=>{
        console.log(response,"response");
        this.todoList.push(response);
      },
      error:(error)=>{
        console.log(error)
      }
    })
  }
  updateList(event:any){
    if(event){
      this.getTodoList();
    }
  }




}
