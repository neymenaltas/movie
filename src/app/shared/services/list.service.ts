import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {catchError} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  errorMessage: string;

  constructor(private http: HttpClient) { }

  getMovieList(page, searchTerm = null, sorting = null) {
    let params = new HttpParams();
    params = params.set('page', page);
    params = params.set('searchTerm', searchTerm);
    params = params.set('sorting', sorting);
    return this.http.get<any>(environment.apiUrl + '/movies', {params})
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteMovie(id: string) {
    let params = new HttpParams();
    params = params.set('id', id);
    return this.http.delete<any>(environment.apiUrl + '/movies', {params})
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(err) {
    this.errorMessage = `${err.error.message}`;
    return throwError(this.errorMessage);
  }
}
