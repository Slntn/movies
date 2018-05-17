import { Component, OnInit } from '@angular/core';
import { NgForm, Form } from '@angular/forms';

import { DataService } from '../data.service';
import { Movie } from '../models/Movie';
import { Review } from '../models/Review';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-addreview',
  templateUrl: './addreview.component.html',
  styleUrls: ['./addreview.component.css']
})
export class AddreviewComponent implements OnInit {
review: Review = new Review();
movie_id = '';
title = '';
  constructor(private _dataService: DataService, private router: Router, private route: ActivatedRoute) {
    this.route.paramMap.subscribe( params => this.movie_id = params.get('id'));
    this.route.paramMap.subscribe( params => {
      this._dataService.getMovie(params.get('id')).subscribe(
        data => {
          this.title = JSON.parse(data._body)[0]['title'];
        }
      );
    });
  }

  ngOnInit() {
  }

  onSubmit(data) {
    this.review.rating = data.stars;
    this.review.text = data.review;
    this.review.userName = data.name;

    this._dataService.addReview(this.review, this.movie_id)
        .subscribe(error => console.log('error creating new movie', error));

    this.router.navigateByUrl('/movies');
  }

}
