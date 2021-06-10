import {Handler} from "../../shared/handler/base.handler";
import {AppState} from "../../shared/store/app.state";
import {select, Store} from "@ngrx/store";
import {ElementRef, Injectable, Input, ViewChild} from "@angular/core";
import {Movie} from "../../shared/models/movie.model";
import {ActivatedRoute, Router} from "@angular/router";
import {
  AddMovieAction,
  LoadSelectedMovieAction,
  SearchMovieAction,
  SetSearchListEmptyAction,
  UpdateMovieAction
} from "../../shared/store/actions/form.actions";
import { Observable, Subject} from "rxjs";
import * as formSlice from "../../shared/store/reducers/form.reducer";
import {debounceTime, distinctUntilChanged, take, takeUntil} from "rxjs/operators";
import {FormControl, Validators} from "@angular/forms";

@Injectable()
export class FormPageHandler extends Handler {

  public searchText: string;

  public selectedMovie: Movie = {title: '', poster: null, rating: null};

  public ratingValidator: FormControl = new FormControl('', [Validators.required, Validators.min(0), Validators.max(10)]);

  public titleValidator: FormControl = new FormControl({value: '', disabled: true}, [Validators.required]);

  public posterValidator: FormControl = new FormControl({value: '', disabled: true}, [Validators.required]);

  public searchTextUpdate$: Subject<string> = new Subject<string>();

  public id: string;

  public selectedMovie$: Observable<Movie> = this.appState$.pipe(
    select(formSlice.getSelectedMovie),
    takeUntil(this._endSubscriptions$)
  );

  public searchedMovies$: Observable<Movie[]> = this.appState$.pipe(
    select(formSlice.getSearchedMovies),
    takeUntil(this._endSubscriptions$)
  );

  public isSearching$: Observable<boolean> = this.appState$.pipe(
    select(formSlice.getIsSearching),
    takeUntil(this._endSubscriptions$)
  );

  public isSearchFailed$: Observable<boolean> = this.appState$.pipe(
    select(formSlice.getIsSearchFailed),
    takeUntil(this._endSubscriptions$)
  );

  public constructor(
    protected appState$: Store<AppState>, public route: ActivatedRoute) {
    super(appState$);
  }

  public init() {
    let id;
    this.route.queryParamMap.subscribe( paramMap => {
      this.id = paramMap.get('id');
      this.appState$.dispatch(new LoadSelectedMovieAction(this.id))
    });
    if (this.id) {
      this.selectedMovie$.pipe(
        takeUntil(this._endSubscriptions$)
      ).subscribe(selectedMovie => {
        if (selectedMovie) {
          this.selectedMovie = selectedMovie
        }
      });
    } else {
      this.searchTextUpdate$.pipe(
        debounceTime(400),
        distinctUntilChanged(),
        takeUntil(this._endSubscriptions$)
      ).subscribe(( searchTerm) => {
        this.appState$.dispatch(new SearchMovieAction(searchTerm));
      });
    }
  }

  public submit() {
    if (
      this.ratingValidator.invalid ||
      this.titleValidator.invalid ||
      this.posterValidator.invalid
    ) {
      this.ratingValidator.markAsTouched();
      this.titleValidator.markAsTouched();
      this.posterValidator.markAsTouched();
    }
    else {
      const movie: Movie = {
        id: this.selectedMovie.id || null,
        title: this.titleValidator.value,
        poster: this.posterValidator.value,
        rating: this.ratingValidator.value,
        createdAt: this.selectedMovie.createdAt
      };
      this.id
      ? this.appState$.dispatch(new UpdateMovieAction(movie))
      : this.appState$.dispatch(new AddMovieAction(movie))
    }
  }

  public selectMovie(movie) {
    this.selectedMovie = movie;
    this.appState$.dispatch(new SetSearchListEmptyAction(null))
  }

}
