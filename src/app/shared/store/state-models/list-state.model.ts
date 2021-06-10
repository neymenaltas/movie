import {Movie} from '../../models/movie.model';

export class ListState {
  movieList: Movie[];
  loading: boolean;
  loaded: boolean;
  loadFailed: boolean;
  page: number;
  isLast: boolean;
  total: number;
  searchTerm: string;
  sorting: string;

  public constructor(data: Partial<ListState> = null) {
    Object.keys(data || {})
      .filter(property => this.hasOwnProperty(property))
      .forEach(property => (this[property] = data[property]));
  }
}
