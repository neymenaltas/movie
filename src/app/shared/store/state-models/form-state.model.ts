import {Movie} from "../../models/movie.model";

export class FormState {
  selectedMovie: Movie;
  searchedMovies: Movie[];
  loading: boolean;
  loaded: boolean;
  loadFailed: boolean;
  searching: boolean;
  searched: boolean;
  searchFailed: boolean;

  public constructor(data: Partial<FormState> = null) {
    Object.keys(data || {})
      .filter(property => this.hasOwnProperty(property))
      .forEach(property => (this[property] = data[property]));
  }
}
