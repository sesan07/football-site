import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpRequest} from '@angular/common/http';
import {Fixture, FixturesApiResponse} from '../fixture.model';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly BASE_URL = 'https://v2.api-football.com';

  constructor(private http: HttpClient) { }

  getLiveFixtures() {
    this.http.get<FixturesApiResponse>(
      this.BASE_URL + '/fixtures/live'
    )
      .pipe(map((responseJsonData => {
        let fixtures: Fixture[] = [];
        if (responseJsonData.api && responseJsonData.api.fixtures) {
          fixtures = responseJsonData.api.fixtures;
        }

        return fixtures;
      })))
      .subscribe(fixtures => {
        console.log(fixtures);
      }, error => {
        console.log(error);
      });
  }

  authenticate(req: HttpRequest<any>) {
    const modifiedRequest = req.clone({
      headers: req.headers.append('X-RapidAPI-Key', 'b16746ebc03432256bce562b1766ccc3')
    });
  }
}
