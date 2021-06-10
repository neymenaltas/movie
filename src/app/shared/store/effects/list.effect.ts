import { Injectable } from '@angular/core';
import { Observable, of} from 'rxjs';
import {map, catchError, switchMap, mergeMap, exhaustMap, tap} from 'rxjs/operators';
import * as listActions from '../actions/list.actions';
import {ofType, Actions, createEffect} from '@ngrx/effects';
import {ListService} from '../../services/list.service';
import {ToastrService} from 'ngx-toastr';

@Injectable()
export class ListEffects {
  constructor(private listService: ListService, private actions$: Actions, public toastService: ToastrService) {

  }

  public loadList$ = createEffect(() => {
    return this.actions$.pipe(
    ofType(listActions.ListActionTypes.LoadList),
    switchMap( (action: any) =>
      this.listService.getMovieList(action.payload.page, action.payload.searchTerm, action.payload.sorting).pipe(
        map(res => new listActions.LoadListSuccessAction(res)),
        catchError(err => of(new listActions.LoadListFailAction(err)))
      )
    )
  )});

  public changeSearchTerm$ = createEffect(() => {
    return this.actions$.pipe(
    ofType(listActions.ListActionTypes.ChangeFilter),
    exhaustMap( (action: any) =>
      this.listService.getMovieList(0, action.payload.searchTerm, action.payload.sorting).pipe(
        map(res => new listActions.LoadListSuccessAction(res)),
        catchError(err => of(new listActions.LoadListFailAction(err)))
      )
    )
  )});

  public deleteMovie$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(listActions.ListActionTypes.DeleteMovie),
      switchMap( (action: any) =>
        this.listService.deleteMovie(action.payload.id).pipe(
          map(res => new listActions.DeleteMovieSuccessAction(action.payload)),
          catchError(err => of(new listActions.DeleteMovieFailAction(err)))
        )
      )
    )});

  public deleteMovieSuccess$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(listActions.ListActionTypes.DeleteMovieSuccess),
        tap((action: any) => this.toastService.success(`${action.payload.title} filmi başarıyla silindi.`))
      )},
    {dispatch: false}
  );

  public deleteMovieFail$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(listActions.ListActionTypes.DeleteMovieFail),
        tap((action: any) => this.toastService.error(action.payload))
      )},
    {dispatch: false}
  );

}
