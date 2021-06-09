import { Action } from '@ngrx/store';

export enum ListActionTypes {
  LoadList = '[List] Load List',
  LoadListSuccess = '[List] Load List Success',
  LoadListFail = '[List] Load List Fail',
  ChangeFilter = '[List] Change Filter',
  SetListEmpty = '[List] Set List Empty',
  DeleteMovie = '[List] Delete Movie',
  DeleteMovieSuccess = '[List] Delete Movie Success',
  DeleteMovieFail = '[List] Delete Movie Fail',
}

export class LoadListAction implements Action {
  readonly type: string = ListActionTypes.LoadList;
  constructor(public payload: any) {}
}

export class LoadListSuccessAction implements Action {
  readonly type: string = ListActionTypes.LoadListSuccess;
  constructor(public payload: any) { }
}

export class LoadListFailAction implements Action {
  readonly type: string = ListActionTypes.LoadListFail;
  constructor(public payload: string) { }
}

export class ChangeFilterAction implements Action {
  readonly type: string = ListActionTypes.ChangeFilter;
  constructor(public payload: any) { }
}

export class SetListEmptyAction implements Action {
  readonly type: string = ListActionTypes.SetListEmpty;
  constructor(public payload: any) { }
}

export class DeleteMovieAction implements Action {
  readonly type: string = ListActionTypes.DeleteMovie;
  constructor(public payload: string) {}
}

export class DeleteMovieSuccessAction implements Action {
  readonly type: string = ListActionTypes.DeleteMovieSuccess;
  constructor(public payload: any) { }
}

export class DeleteMovieFailAction implements Action {
  readonly type: string = ListActionTypes.DeleteMovieFail;
  constructor(public payload: string) { }
}


export type ListActions = LoadListAction
  | LoadListSuccessAction
  | LoadListFailAction
  | ChangeFilterAction
  | SetListEmptyAction
  | DeleteMovieAction
  | DeleteMovieSuccessAction
  | DeleteMovieFailAction;
