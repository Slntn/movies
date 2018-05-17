import { Routes, RouterModule } from '@angular/router';

import { MovieListComponent } from './movie-list/movie-list.component';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { AddreviewComponent } from './addreview/addreview.component';
import { MovieReviewComponent } from './movie-review/movie-review.component';


const APP_ROUTES: Routes = [
    { path: 'movies', component: MovieListComponent, pathMatch: 'full' },
    { path: 'movies/add/new', component: AddMovieComponent },
    { path: 'movies/:id', component: MovieReviewComponent },
    { path: 'movies/review/:id', component: AddreviewComponent },
];

export const Routing = RouterModule.forRoot(APP_ROUTES);
