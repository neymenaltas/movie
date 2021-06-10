import { Injectable } from '@angular/core';
import { of} from 'rxjs';
import {map, catchError, switchMap, mergeMap, exhaustMap, tap} from 'rxjs/operators';
import * as formActions from '../actions/form.actions';
import {ofType, Actions, createEffect} from '@ngrx/effects';
import {FormService} from '../../services/form.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

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
          map(res => new formActions.UpdateMovieSuccessAction(action.payload)),
          catchError(err => of(new formActions.UpdateMovieFailAction(err)))
        )
      )
    )});

  public searchMovies$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(formActions.FormActionTypes.SearchMovie),
      switchMap( (action: any) =>
        this.formService.searchMovies(action.payload).pipe(
          map(res => new formActions.SearchMovieSuccessAction(res.Search.map(item => {
              return {
                title: item.Title,
                poster: item.Poster,
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
          map(res => new formActions.AddMovieSuccessAction(action.payload)),
          catchError(err => of(new formActions.AddMovieFailAction(err)))
        )
      )
    )});

  public addMovieSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(formActions.FormActionTypes.AddMovieSuccess),
      tap((action: any) => {
        this.toastService.success(`${action.payload.title} filmi başarıyla eklendi.`);
        this.router.navigate(['/list']);
      })
    )},
    {dispatch: false}
    );

  public addMovieFail$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(formActions.FormActionTypes.AddMovieFail),
        tap((action: any) => {
          this.toastService.error(action.payload);
        })
      )},
    {dispatch: false}
  );

  public updateMovieSuccess$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(formActions.FormActionTypes.UpdateMovieSuccess),
        tap((action: any) => {
          this.toastService.success(`${action.payload.title} filmi başarıyla güncellendi.`);
          this.router.navigate(['/list']);
        })
      )},
    {dispatch: false}
  );

  public updateMovieFail$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(formActions.FormActionTypes.UpdateMovieFail),
        tap((action: any) => this.toastService.error(action.payload))
      )},
    {dispatch: false}
  );
}
