import { Injectable } from '@angular/core';
import { Observable, of} from 'rxjs';
import {map, catchError, switchMap, mergeMap, exhaustMap, tap} from 'rxjs/operators';
import * as formActions from '../actions/form.actions';
import {ofType, Actions, createEffect} from '@ngrx/effects';
import {FormService} from "../../services/form.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Injectable()
export class FormEffects {
  constructor(private formService: FormService, private actions$: Actions, public toastService: ToastrService, private router: Router) {

  }

  public loadSelectedMovie$ = createEffect(() => {
    return this.actions$.pipe(
    ofType(formActions.FormActionTypes.LoadSelectedMovie),
    switchMap( (action: any) =>
      this.formService.getSelectedMovie(action.payload).pipe(
        map(res => new formActions.LoadSelectedMovieSuccessAction(res)),
        catchError(err => of(new formActions.LoadSelectedMovieFailAction(err)))
      )
    )
  )});

  public updateMovie$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(formActions.FormActionTypes.UpdateMovie),
      switchMap( (action: any) =>
        this.formService.updateMovie(action.payload).pipe(
          map(res => new formActions.UpdateMovieSuccessAction(res)),
          catchError(err => of(new formActions.UpdateMovieFailAction(err)))
        )
      )
    )});

  public searchMovies$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(formActions.FormActionTypes.SearchMovie),
      switchMap( (action: any) =>
        this.formService.searchMovies(action.payload).pipe(
          map(res => new formActions.SearchMovieSuccessAction(res.map(item => {
              return {
                title: item.title,
                poster: item.poster,
                rating: item.rating
              }
            })
          )),
          catchError(err => of(new formActions.SearchMovieFailAction(err)))
        )
      )
    )});

  public addMovie$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(formActions.FormActionTypes.AddMovie),
      switchMap( (action: any) =>
        this.formService.addMovie(action.payload).pipe(
          map(res => new formActions.AddMovieSuccessAction(res)),
          catchError(err => of(new formActions.AddMovieFailAction(err)))
        )
      )
    )});

  public addMovieSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(formActions.FormActionTypes.AddMovieSuccess),
      tap(() => {
        this.toastService.success('Film başarıyla eklendi.')
        this.router.navigate(['/list']);
      })
    )},
    {dispatch: false}
    );

  public addMovieFail$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(formActions.FormActionTypes.AddMovieFail),
        tap(() => this.toastService.error('Film eklenirken bir sıkıntı oluştu.'))
      )},
    {dispatch: false}
  );

  public updateMovieSuccess$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(formActions.FormActionTypes.UpdateMovieSuccess),
        tap(() => {
          this.toastService.success('Film başarıyla güncellendi.');
          this.router.navigate(['/list']);
        })
      )},
    {dispatch: false}
  );

  public updateMovieFail$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(formActions.FormActionTypes.UpdateMovieFail),
        tap(() => this.toastService.error('Film güncellenirken bir sıkıntı oluştu.'))
      )},
    {dispatch: false}
  );
}
