import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Movie } from '../models/Movie';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  data: Object[] = [];
  constructor(private _dataService: DataService) { }

  ngOnInit() {
    this._dataService.getMovies().subscribe(data => {
      this.data = JSON.parse(data._body);
    });
  }

}
