import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { AddreviewComponent } from './addreview/addreview.component';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { MovieReviewComponent } from './movie-review/movie-review.component';

import { Routing } from './routes';
import { DataService } from './data.service';

@NgModule({
  declarations: [
    AppComponent,
    MovieListComponent,
    AddreviewComponent,
    AddMovieComponent,
    MovieReviewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Routing
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
