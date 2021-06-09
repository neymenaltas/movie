import {Injectable, OnDestroy} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { AppState } from '../store/app.state';

@Injectable()
export abstract class Handler implements OnDestroy {

  public _endSubscriptions$: Subject<boolean> = new Subject();
  protected constructor(protected appState$: Store<AppState>) {}

  public ngOnDestroy(): void {
    this._endSubscriptions$.next(true);
    this._endSubscriptions$.complete();
  }
}
