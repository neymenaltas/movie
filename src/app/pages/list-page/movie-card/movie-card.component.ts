import {Component, Input, OnInit} from '@angular/core';
import {MovieCardHandler} from './movie-card.handler';
import {Movie} from '../../../shared/models/movie.model';


@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
  providers: [MovieCardHandler]
})
export class MovieCardComponent implements OnInit {

  @Input() movie: Movie;

  constructor(public handler: MovieCardHandler) { }

  ngOnInit(): void {
    this.handler.movie = this.movie;
  }

}
