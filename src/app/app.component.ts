import {Component, OnInit} from '@angular/core';
import {RepositoryService} from './shared/repository/repository.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'football-site';

  constructor(private repositoryService: RepositoryService) {

  }

  ngOnInit(): void {
    this.repositoryService.getAllFixtures('2020-09-04');
  }
}
