import { Injectable } from '@angular/core';
import { Movie } from './models/Movie';
import { Review } from './models/Review';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Http } from '@angular/http';

@Injectable()
export class DataService {

  constructor(private _http: Http) { }

  create(movie: Movie): Observable<Movie> {
    return this._http.post('/api/create', movie)
    .pipe(
      map(response => response.json())
    );
  }

  getMovies(): Observable<any> {
    return this._http.get('/api/movies');
  }

  getMovie(id): Observable<any> {
    return this._http.get(`/api/movies/${id}`);
  }

  addReview(review, movie_id) {
    return this._http.post(`/api/review/${movie_id}`, review);
  }

  delete(title): Observable<any> {
    return this._http.delete(`/api/delete/${title}`);
  }

}
