import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoListService } from 'src/app/todo-list.service';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.sass'],
})
export class CreateTodoComponent implements OnInit {
  todoFrom!: FormGroup;
  dataReceived: any;
  isEdit: boolean = false;
  key: string = '';
  info: any;
  description: string = '';
  id: any;
  title: string = '';
  constructor(
    private fb: FormBuilder,
    private todoListService: TodoListService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.createtFrom();
  }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.isEdit = params['isEdit'];
      this.key = params['key'];
      this.description = params['description'];
      this.id = params['id'];
      this.title = params['title'];
    });
    if(this.isEdit){
      this.userUpadte();

    }

  }

  createtFrom() {
    this.todoFrom = this.fb.group({
      title: [''],
      description: [''],
    });
  }

  submit() {
    const id = Math.random() * 1000;
    const intValue = Math.floor(id);
    const todoItemData = {
      id: intValue,
      title: this.todoFrom.value.title,
      description: this.todoFrom.value.description,
    };
    if (todoItemData && !this.isEdit) {
      this.todoListService.createTodoItem(todoItemData).subscribe({
        next: (reponse) => {
          console.log(reponse, 'response');
          this.router.navigate(['todo-list']);
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
    if (this.isEdit && this.key) {
      const updatedTodoItem ={
        id:this.id,
        title: this.todoFrom.get('title')?.value,
        description: this.todoFrom.get('description')?.value
      }
      this.todoListService.updateTodoItem(this.key,updatedTodoItem).subscribe({
        next:(response)=>{
          this.router.navigate(['todo-list'])
        },
        error:(error)=>{
          console.log(error)
        }
      })

    }
  }

  userUpadte() {
    const todoItemData = {
      title: this.title,
      description: this.description,
    };
    this.todoFrom.setValue(todoItemData);
  }
  OnCancel() {
    this.router.navigate(['todo-list']);
  }
}
