import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  errorMessage: string;

  constructor(private http: HttpClient) { }

  getSelectedMovie(id: string) {
    return this.http.get<any>(environment.apiUrl + '/movies/' + id)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateMovie(movie) {
    return this.http.put<any>(environment.apiUrl + '/movies/' + movie.id, {movie})
      .pipe(
        catchError(this.handleError)
      );
  }

  searchMovies(searchTerm) {
    return this.http.get<any>('http://www.omdbapi.com/?apikey=' + 'c5575532' + '&s=' + searchTerm)
      .pipe(
        catchError(this.handleError)
      );
  }

  addMovie(movie) {
    return this.http.post<any>(environment.apiUrl + '/movies', {movie})
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(err) {
    this.errorMessage = `${err.error.message}`;
    return throwError(this.errorMessage);
  }
}
