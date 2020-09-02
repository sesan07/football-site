import {Component, OnInit} from '@angular/core';
import {ApiService} from './shared/repository/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'football-site';

  constructor(private apiService: ApiService) {

  }

  ngOnInit(): void {
    this.apiService.getLiveFixtures();
  }
}
