import { Injectable } from '@angular/core';
import { Githubuser } from '../interfaces/githubuser';
import { HttpClient } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class GithubApiService {
  private readonly baseURL: string = 'https://api.github.com/users/'

  constructor(
    private http: HttpClient

  ) { }


  public getUserService(username: string):Observable<Githubuser> {
    return this.http.get<Githubuser>(`${this.baseURL}${username}`).pipe(

      catchError(error => {
        console.error(error);
        return EMPTY;
      })
    );

  }
}
