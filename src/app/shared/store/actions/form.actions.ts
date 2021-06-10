import { Action } from '@ngrx/store';
import {Movie} from "../../models/movie.model";

export enum FormActionTypes {
  LoadSelectedMovie = '[Form] Load Selected Movie',
  LoadSelectedMovieSuccess = '[Form] Load Selected Movie Success',
  LoadSelectedMovieFail = '[Form] Load Selected Movie Fail',
  UpdateMovie = '[Form] Update Movie',
  UpdateMovieSuccess = '[Form] Update Movie Success',
  UpdateMovieFail = '[Form] Update Movie Fail',
  AddMovie = '[Form] Add Movie',
  AddMovieSuccess = '[Form] Add Movie Success',
  AddMovieFail = '[Form] Add Movie Fail',
  SearchMovie = '[Form] Search Movie',
  SearchMovieSuccess = '[Form] Search Movie Success',
  SearchMovieFail = '[Form] Search Movie Fail',
  SetSearchListEmpty = '[Form] Set Search List Empty'
}

export class LoadSelectedMovieAction implements Action {
  readonly type: string = FormActionTypes.LoadSelectedMovie;
  constructor(public payload: string) {}
}

export class LoadSelectedMovieSuccessAction implements Action {
  readonly type: string = FormActionTypes.LoadSelectedMovieSuccess;
  constructor(public payload: Movie) { }
}

export class LoadSelectedMovieFailAction implements Action {
  readonly type: string = FormActionTypes.LoadSelectedMovieFail;
  constructor(public payload: string) { }
}

export class UpdateMovieAction implements Action {
  readonly type: string = FormActionTypes.UpdateMovie;
  constructor(public payload: Movie) { }
}

export class UpdateMovieSuccessAction implements Action {
  readonly type: string = FormActionTypes.UpdateMovieSuccess;
  constructor(public payload: null) {}
}

export class UpdateMovieFailAction implements Action {
  readonly type: string = FormActionTypes.UpdateMovieFail;
  constructor(public payload: string) { }
}

export class SearchMovieAction implements Action {
  readonly type: string = FormActionTypes.SearchMovie;
  constructor(public payload: string) { }
}

export class SearchMovieSuccessAction implements Action {
  readonly type: string = FormActionTypes.SearchMovieSuccess;
  constructor(public payload: Movie[]) { }
}

export class SearchMovieFailAction implements Action {
  readonly type: string = FormActionTypes.SearchMovieFail;
  constructor(public payload: string) { }
}

export class SetSearchListEmptyAction implements Action {
  readonly type: string = FormActionTypes.SetSearchListEmpty;
  constructor(public payload: null) { }
}

export class AddMovieAction implements Action {
  readonly type: string = FormActionTypes.AddMovie;
  constructor(public payload: Movie) { }
}

export class AddMovieSuccessAction implements Action {
  readonly type: string = FormActionTypes.AddMovieSuccess;
  constructor(public payload: Movie) { }
}

export class AddMovieFailAction implements Action {
  readonly type: string = FormActionTypes.AddMovieFail;
  constructor(public payload: string) { }
}



export type FormActions = LoadSelectedMovieAction
  | LoadSelectedMovieSuccessAction
  | LoadSelectedMovieFailAction
  | UpdateMovieAction
  | UpdateMovieSuccessAction
  | UpdateMovieFailAction
  | SearchMovieAction
  | SearchMovieSuccessAction
  | SearchMovieFailAction
  | SetSearchListEmptyAction
  | AddMovieAction
  | AddMovieSuccessAction
  | AddMovieFailAction;
