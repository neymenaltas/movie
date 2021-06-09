import {Handler} from "../../shared/handler/base.handler";
import {AppState} from "../../shared/store/app.state";
import {ActionsSubject, select, Store} from "@ngrx/store";
import {Injectable} from "@angular/core";
import * as listSlice from '../../shared/store/reducers/list.reducer'
import {combineLatest, Observable, Subject} from "rxjs";
import {Movie} from "../../shared/models/movie.model";
import {debounceTime, distinctUntilChanged, take, takeUntil} from "rxjs/operators";
import {
  ChangeFilterAction,
  LoadListAction, SetListEmptyAction
} from "../../shared/store/actions/list.actions";

@Injectable()
export class ListPageHandler extends Handler {

  public searchText: string;

  public searchTextUpdate$: Subject<string> = new Subject<string>();

  public sortingValues: string[] = ["Varsayılan", "Azalan", "Artan"];

  public movies$: Observable<Movie[]> = this.appState$.pipe(
    select(listSlice.getMovies),
    takeUntil(this._endSubscriptions$)
  );

  public isLastPage$: Observable<boolean> = this.appState$.pipe(
    select(listSlice.isLast),
    takeUntil(this._endSubscriptions$)
  );

  public page$: Observable<number> = this.appState$.pipe(
    select(listSlice.page),
    takeUntil(this._endSubscriptions$)
  );

  public searchTerm$: Observable<string> = this.appState$.pipe(
    select(listSlice.searchTerm),
    takeUntil(this._endSubscriptions$)
  );

  public sorting$: Observable<string> = this.appState$.pipe(
    select(listSlice.sorting),
    takeUntil(this._endSubscriptions$)
  );

  public isLoading$: Observable<boolean> = this.appState$.pipe(
    select(listSlice.getIsLoading),
    takeUntil(this._endSubscriptions$)
  );

  public isLoaded$: Observable<boolean> = this.appState$.pipe(
    select(listSlice.getIsLoaded),
    takeUntil(this._endSubscriptions$)
  );


  public constructor(
    protected appState$: Store<AppState>) {
    super(appState$);
  }

  public init() {
    this.appState$.dispatch(new LoadListAction({page: 0, searchTerm: '', sorting: 'Varsayılan'}));

    combineLatest([this.searchTextUpdate$, this.sorting$]).pipe(
      debounceTime(400),
      distinctUntilChanged(),
      takeUntil(this._endSubscriptions$)
    ).subscribe(([ searchTerm, sorting]: [string, string]) => {
      this.appState$.dispatch(new ChangeFilterAction({searchTerm, sorting}));
    });
  }

  public loadMore() {
    combineLatest([this.page$, this.searchTerm$, this.isLastPage$, this.sorting$]).pipe(
      take(1),
      takeUntil(this._endSubscriptions$)
    ).subscribe(([page, searchTerm, isLast, sorting]: [number, string, boolean, string]) => {
      if (!isLast) {
        this.appState$.dispatch(new LoadListAction({page: +page+1, searchTerm, sorting}));
      }
    });
  }

  public changeSorting(event) {
    this.searchTerm$.pipe(
      take(1)
    ).subscribe(searchTerm => {
      this.appState$.dispatch(new ChangeFilterAction({searchTerm, sorting: event.value}));
    })
  }

  ngOnDestroy(): void {
    this.appState$.dispatch(new SetListEmptyAction({}));
    super.ngOnDestroy();
  }
}
