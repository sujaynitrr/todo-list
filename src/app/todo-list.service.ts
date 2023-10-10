import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TodoListService {
  private apiUrl ='https://angular-todo-list-51b09-default-rtdb.firebaseio.com/';
  private baseUrl = 'https://angular-todo-list-51b09-default-rtdb.firebaseio.com/todos';

  constructor(private http: HttpClient) {}

  // Create a method to send a POST request to your API
  createTodoItem(todoItemData: any) {
    const url = `${this.apiUrl}/todos.json`;
    return this.http.post(url, todoItemData);
  }
  getTodoList(){
    const url = `${this.apiUrl}/todos.json`;
    return this.http.get(url);
  }
  deleteTodoItem(todoItemId: string) {

    const url = `${this.baseUrl}/${todoItemId}.json`;
    return this.http.delete(url);
  }
  updateTodoItem(todoItemId: string,updatedData:any) {
    const url = `${this.baseUrl}/${todoItemId}.json`;
    return this.http.put(url,updatedData);
  }
}
