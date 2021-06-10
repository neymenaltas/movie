import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';

let movies = JSON.parse(localStorage.getItem('movies')) || [];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;

    // wrap in delayed observable to simulate server api call
    return of(null)
      .pipe(mergeMap(handleRoute))
      .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
      .pipe(delay(500))
      .pipe(dematerialize());

    function handleRoute() {
      switch (true) {
        case url.endsWith('/movies') && method === 'GET':
          return getMovies();
        case url.endsWith('/movies') && method === 'POST':
          return addMovie();
        case url.endsWith('/search') && method === 'GET':
          return searchMovies();
        case !url.startsWith('http://localhost:4000/movies/null') && !url.startsWith('http://www.omdbapi.com') && !url.endsWith('/movies') && method === 'GET':
          return getMovieById();
        case !url.endsWith('/movies') && method === 'PUT':
          return updateMovie();
        case url.endsWith('/movies') && method === 'DELETE':
          return deleteMovie();
        default:
          // pass through any requests not handled above
          return next.handle(request);
      }
    }

    function getMovies() {
      if (JSON.parse(localStorage.getItem('movies')) === null ) {
        localStorage.setItem('movies', JSON.stringify([]));
      }
      const params = request.params;
      const page = params.get('page');
      const searchTerm = params.get('searchTerm');
      const sorting = params.get('sorting');

      if (searchTerm !== 'null' && searchTerm !== 'Varsayılan') {
        movies = JSON.parse(localStorage.getItem('movies')).filter(movie => movie.title.toLowerCase().includes(searchTerm.toLowerCase()))
      } else {
        movies = JSON.parse(localStorage.getItem('movies')) || [];
      }

      if(sorting !== 'null' && sorting !== 'Varsayılan') {
        if(sorting === 'Artan') {
          movies = movies.sort((movie1, movie2) => (movie1.rating - movie2.rating || movie1.createdAt - movie2.createdAt))
        } else if(sorting === 'Azalan') {
          movies = movies.sort((movie1, movie2) => (movie2.rating - movie1.rating || movie1.createdAt - movie2.createdAt))
        }
      }

      const total = movies.length;
      const isLast = (+page+1) * 10 > total;

      const res = {
        movies: movies.slice(+page*10, (+page+1)*10),
        isLast,
        total,
        page,
      };
      return ok(res);
    }

    function getMovieById() {
      const movie = movies.find(x => x.id === idFromUrl());
      return ok(movie);
    }

    function updateMovie() {

      let params = body.movie;
      let movieIndex = movies.findIndex(x => x.id === idFromUrl());
      movies[movieIndex] = params;

      localStorage.setItem('movies', JSON.stringify(movies));

      return ok();
    }

    function addMovie() {
      let movie= {
        ...body.movie,
        id: uuidv4(),
        createdAt: new Date(),
        poster: body.movie.poster !== undefined ? body.movie.poster : 'https://image.winudf.com/v2/image/Y29tLm5vdC5mb3VuZGRfc2NyZWVuXzBfMTUxNzI3OTU0OV8wMzU/screen-0.jpg?fakeurl=1&type=.jpg'
      };

      movies.unshift(movie);

      localStorage.setItem('movies', JSON.stringify(movies));
      return ok();
    }

    function deleteMovie() {

      const params = request.params;
      const id = params.get('id');

      movies = JSON.parse(localStorage.getItem('movies')).filter(x => x.id !== id);
      localStorage.setItem('movies', JSON.stringify(movies));
      return ok();
    }

    // helper functions

    function ok(body?) {
      return of(new HttpResponse({ status: 200, body }))
    }

    function error(message) {
      return throwError({ error: { message } });
    }

    function searchMovies() {
      const params = request.params;
      const searchTerm = params.get('searchTerm');
      const res = [
        {
          "title":"Guardians of the Galaxy Vol. 2",
          "poster":"https://m.media-amazon.com/images/M/MV5BNjM0NTc0NzItM2FlYS00YzEwLWE0YmUtNTA2ZWIzODc2OTgxXkEyXkFqcGdeQXVyNTgwNzIyNzg@._V1_SX300.jpg",
          "rating":1,
          "Genre":"Drama",
        },
        {
          "title":"Godfather",
          "poster":"https://m.media-amazon.com/images/M/MV5BZTkyYzc5MGEtYTBiYS00ZmYyLThlZWUtOWY3ZWE4ZDhlN2MzXkEyXkFqcGdeQXVyMjM0ODk5MDU@._V1_SX300.jpg",
          "rating":2,
          "Genre":"Drama",
        },
        {
          "title":"Gora",
          "rating":3,
        },
        {
          "title":"Godfather",
          "poster":"https://m.media-amazon.com/images/M/MV5BZTkyYzc5MGEtYTBiYS00ZmYyLThlZWUtOWY3ZWE4ZDhlN2MzXkEyXkFqcGdeQXVyMjM0ODk5MDU@._V1_SX300.jpg",
          "rating":4,
          "Genre":"Drama",
        },
        {
          "title":"Guardians of the Galaxy Vol. 2",
          "poster":"https://m.media-amazon.com/images/M/MV5BNjM0NTc0NzItM2FlYS00YzEwLWE0YmUtNTA2ZWIzODc2OTgxXkEyXkFqcGdeQXVyNTgwNzIyNzg@._V1_SX300.jpg",
          "rating":5,
          "Genre":"Drama",
        },
        {
          "title":"Godfather",
          "poster":"https://m.media-amazon.com/images/M/MV5BZTkyYzc5MGEtYTBiYS00ZmYyLThlZWUtOWY3ZWE4ZDhlN2MzXkEyXkFqcGdeQXVyMjM0ODk5MDU@._V1_SX300.jpg",
          "rating":6,
          "Genre":"Drama",
        }
      ]
      return ok(res);
    }

    function idFromUrl() {
      const urlParts = url.split('/');
      return urlParts[urlParts.length - 1];
    }

  }
}

export const fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};
