import {FormActions, FormActionTypes} from '../actions/form.actions';
import {AppState} from '../app.state';
import {createSelector} from '@ngrx/store';
import {FormState} from '../state-models/form-state.model';

const initialState: FormState = {
  loading: false,
  loaded: false,
  loadFailed: false,
  selectedMovie: null,
  searchedMovies: [],
  searching: false,
  searched: false,
  searchFailed: false,
};

export const selectFormState = (state: AppState) => state.form;

export const getSelectedMovie = createSelector(
  selectFormState,
  (state: FormState) => state.selectedMovie
);

export const getSearchedMovies = createSelector(
  selectFormState,
  (state: FormState) => state.searchedMovies
);

export const getIsSearching = createSelector(
  selectFormState,
  (state: FormState) => state.searching
);

export const getIsSearched = createSelector(
  selectFormState,
  (state: FormState) => state.searched
);

export const getIsSearchFailed = createSelector(
  selectFormState,
  (state: FormState) => state.searchFailed
);


export function reducer(state = initialState, action: FormActions) {
  switch (action.type) {
    case FormActionTypes.LoadSelectedMovie: {
      return {
        ...state
      }
    }
    case FormActionTypes.LoadSelectedMovieSuccess: {
      return {
        ...state,
        selectedMovie: action.payload
      };
    }
    case FormActionTypes.LoadSelectedMovieFail: {
      return {
        ...state
      };
    }
    case FormActionTypes.SearchMovie:{
      return {
        ...state,
        searchedMovies: [],
        searching: true,
        searched: false,
        searchFailed: false,
      };
    }
    case FormActionTypes.SearchMovieSuccess:{
      return {
        ...state,
        searchedMovies: action.payload,
        searching: false,
        searched: true,
        searchFailed: false,
      };
    }
    case FormActionTypes.SearchMovieFail:{
      return {
        ...state,
        searchedMovies: null,
        searching: false,
        searched: false,
        searchFailed: true,
      };
    }
    case FormActionTypes.SetSearchListEmpty: {
      return {
        ...state,
        searchedMovies: [],
      }
    }
    default: {
      return state;
    }
  }
}
