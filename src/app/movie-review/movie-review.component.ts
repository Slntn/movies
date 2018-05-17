import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-movie-review',
  templateUrl: './movie-review.component.html',
  styleUrls: ['./movie-review.component.css']
})
export class MovieReviewComponent implements OnInit {
  data = [];
  title: string;
  constructor(private _dataService: DataService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe( params => {
      this._dataService.getMovie(params.get('id')).subscribe(
        data => {
          this.data = JSON.parse(data._body)[0]['reviews'];
          this.title = JSON.parse(data._body)[0]['title'];
        }
      );
    });
  }

  onClick(title) {
    this._dataService.delete(title).subscribe(data => {
      console.log(data);
    });
    this.router.navigateByUrl('/movies');
  }
}
