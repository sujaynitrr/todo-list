import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoListService } from 'src/app/todo-list.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.sass'],
})
export class TodoComponent implements OnInit, OnChanges {
  @Input() todo: any;
  todoList: any[] = [];
  @Output() newTodoEvent = new EventEmitter<boolean>();
  isEdit:boolean=false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private todoListService: TodoListService,
    private router: Router
  ) {}
  ngOnChanges(changes: SimpleChanges) {

  }

  ngOnInit(): void {
    this.todoList = Object.values(this.todo[0] || {});
  }

  onDelete(id: number) {
    if (this.todo && this.todo.length > 0) {
      let itemId: string = '';
      this.todo.findIndex((obj: any) => {
        for (const key in obj) {
          if (obj[key].id === id) {
            itemId = key;
          }
        }
      });
      if (itemId !== undefined) {
        this.todoListService.deleteTodoItem(itemId).subscribe({
          next: (response) => {
            this.newTodoEvent.emit(true);
          },
          error: (error) => {
            console.log(error, 'error');
          },
        });
      }
    }
  }
  onEdit(id:number){
    let itemId:string='';
    if (this.todo && this.todo.length > 0) {
      let itemId: string = '';
      this.todo.findIndex((obj: any) => {
        for (const key in obj) {
          if (obj[key].id === id) {
            itemId = key;
            this.isEdit= true;
             const {description,id, title}= obj[key]
            this.router.navigate(['/todo',{isEdit: this.isEdit,key:itemId, description:description, title:title,id:id}]);
          }
        }
      });

    }


  }


}
