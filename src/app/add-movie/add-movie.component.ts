import { Component, OnInit } from '@angular/core';
import { NgForm, Form } from '@angular/forms';

import { DataService } from '../data.service';
import { Movie } from '../models/Movie';
import { Review } from '../models/Review';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnInit {
  movie: Movie = new Movie();
  review: Review = new Review();
  constructor(private _dataService: DataService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(data) {
    this.movie.title = data.title;
    this.movie.reviews = [];
    this.review.userName = data.username;
    this.review.text = data.review;
    this.review.rating = data.stars;
    this.movie.reviews.push(this.review);

    this._dataService.create(this.movie).subscribe(error => {
      console.log('error creating new movie', error);
    });
    this.router.navigateByUrl('/movies');
  }

}
