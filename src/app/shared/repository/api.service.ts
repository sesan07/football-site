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

  getAllFixtures(date: string) {
    return this.http.get<FixturesApiResponse>(
      this.BASE_URL + '/fixtures/date/' + date
    );
  }

  getAllFixturesTest(date: string) {
    return this.http.get<FixturesApiResponse>(
      'assets/test-data/all_fixtures.json'
    );
  }

  getLiveFixtures() {
    return this.http.get<FixturesApiResponse>(
      this.BASE_URL + '/fixtures/live'
    );
  }

  authenticate(req: HttpRequest<any>) {
    const modifiedRequest = req.clone({
      headers: req.headers.append('X-RapidAPI-Key', 'b16746ebc03432256bce562b1766ccc3')
    });
  }
}
