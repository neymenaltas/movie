import { ListState } from '../state-models/list-state.model';
import {ListActions, ListActionTypes} from '../actions/list.actions';
import {AppState} from '../app.state';
import {createSelector} from '@ngrx/store';

const initialState: ListState = {
  loading: false,
  loaded: false,
  loadFailed: false,
  movieList: [
  ],
  page: 0,
  isLast: false,
  total: 0,
  searchTerm: '',
  sorting: 'Varsayılan'
};

export const selectListState = (state: AppState) => state.list;

export const getMovies = createSelector(
  selectListState,
  (state: ListState) => state.movieList
);

export const isLast = createSelector(
  selectListState,
  (state: ListState) => state.isLast
);

export const page = createSelector(
  selectListState,
  (state: ListState) => state.page
);

export const searchTerm = createSelector(
  selectListState,
  (state: ListState) => state.searchTerm
);

export const sorting = createSelector(
  selectListState,
  (state: ListState) => state.sorting
);

export const getIsLoading = createSelector(
  selectListState,
  (state: ListState) => state.loading
);

export const getIsLoaded = createSelector(
  selectListState,
  (state: ListState) => state.loaded
);

export function reducer(state = initialState, action: ListActions) {
  switch (action.type) {
    case ListActionTypes.LoadList: {
      return {
        ...state,
        loading: true,
        loaded: false,
        loadFailed: false,
      }
    }
    case ListActionTypes.LoadListSuccess: {
      return {
        ...state,
        movieList: [
          ...state.movieList,
          ...action.payload.movies
        ],
        page: action.payload.page,
        total: action.payload.total,
        isLast: (+action.payload.page+1)*10 >= action.payload.total,
        loading: false,
        loaded: true,
        loadFailed: false,
      };
    }
    case ListActionTypes.LoadListFail: {
      return {
        ...state,
        loading: false,
        loaded: false,
        loadFailed: true,
      };
    }
    case ListActionTypes.ChangeFilter: {
      return {
        ...state,
        movieList: [],
        searchTerm: action.payload.searchTerm,
        sorting: action.payload.sorting,
        loading: true,
        loaded: false,
        loadFailed: false,
      };
    }
    case ListActionTypes.SetListEmpty: {
      return {
        ...initialState
      }
    }
    case ListActionTypes.DeleteMovieSuccess: {
      return {
        ...state,
        movieList: state.movieList.filter(movie => movie.id !== action.payload.id),
        total: state.movieList.length
      }
    }
    default: {
      return state;
    }
  }
}
