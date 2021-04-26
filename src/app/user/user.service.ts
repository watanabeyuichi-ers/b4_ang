import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from './user'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: User[];
  private url = 'http://192.168.10.206:8888';

  constructor(
    private http: HttpClient
  ) {
    // this.users = [
    //   { id: 1, name: 'Yamada', email: 'yamada@example.com' },
    //   { id: 2, name: 'Suzuki', email: 'suzuki@example.com' },
    //   { id: 3, name: 'Tanaka', email: 'tanaka@example.com' },
    // ];
   }

   getUsers(): Observable<User[]>{
     return this.http.get<User[]>(`${this.url}/users/`)
     .pipe(
       catchError(this.handleError('getUsers', []))
     );
   }

   getUser(id: number): Observable<User>{
    return this.http.get<User>(`${this.url}/users/${id}`)
    .pipe(
      catchError(this.handleError<User>(`getUser id=${id}`))
    );
   }

   setUser(user: User): Observable<User> {
    const id = user.id;
    return this.http.post<User>(`${this.url}/users/${id}`, user)
      .pipe(
        catchError(this.handleError<User>(`setUser id=${id}`))
      );
  }

   
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }


}
