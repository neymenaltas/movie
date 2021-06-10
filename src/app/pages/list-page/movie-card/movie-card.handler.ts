import {Handler} from '../../../shared/handler/base.handler';
import {AppState} from '../../../shared/store/app.state';
import {Store} from '@ngrx/store';
import {Injectable} from '@angular/core';
import {Movie} from '../../../shared/models/movie.model';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmationDialogComponent} from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import {DeleteMovieAction} from '../../../shared/store/actions/list.actions';

@Injectable()
export class MovieCardHandler extends Handler {

  public movie: Movie;

  public constructor(
    protected appState$: Store<AppState>, public dialog: MatDialog) {
    super(appState$);
  }

  public deleteItem(event, movie: Movie) {
    event.stopPropagation();
    this.openDialog(movie);
  }

  openDialog(movie: Movie): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {title: `${this.movie.title} filmini listeden çıkarmak istediğinizden emin misiniz?`}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.appState$.dispatch(new DeleteMovieAction(movie))
      }
    });
  }
}
