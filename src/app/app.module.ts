import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthInterceptorService} from './shared/repository/auth-interceptor.service';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SidebarItemComponent } from './sidebar/sidebar-item/sidebar-item.component';
import { SearchComponent } from './search/search.component';
import { NewsComponent } from './home/news/news.component';
import { HomeFixturesComponent } from './home/home-fixtures/home-fixtures.component';
import { FixtureGroupComponent } from './shared/components/fixture-group/fixture-group.component';
import { FixtureItemComponent } from './shared/components/fixture-group/fixture-item/fixture-item.component';
import { TeamComponent } from './team/team.component';
import { HomeComponent } from './home/home.component';
import { TabToggleComponent } from './shared/components/tab-toggle/tab-toggle.component';
import { TeamPlayerComponent } from './team/team-squad/team-player/team-player.component';
import { TeamStatComponent } from './team/team-stat/team-stat.component';
import {AppRoutingModule} from './app-routing.module';
import { LeagueComponent } from './league/league.component';
import { LeagueTopScorerComponent } from './league/league-top-scorers/league-top-scorer/league-top-scorer.component';
import {FixtureComponent} from './fixture/fixture.component';
import { FixtureLineUpsComponent } from './fixture/fixture-line-ups/fixture-line-ups.component';
import { FixtureEventsComponent } from './fixture/fixture-events/fixture-events.component';
import { FixtureStatisticsComponent } from './fixture/fixture-statistics/fixture-statistics.component';
import { FixtureHeadToHeadComponent } from './fixture/fixture-head-to-head/fixture-head-to-head.component';
import { FixtureLineUpTeamComponent } from './fixture/fixture-line-ups/fixture-line-up-team/fixture-line-up-team.component';
import { FixtureLineUpPlayerComponent } from './fixture/fixture-line-ups/fixture-line-up-team/fixture-line-up-player/fixture-line-up-player.component';
import { FixtureEventItemComponent } from './fixture/fixture-events/fixture-event-item/fixture-event-item.component';
import { FixtureStatisticsItemComponent } from './fixture/fixture-statistics/fixture-statistics-item/fixture-statistics-item.component';
import { TeamSquadComponent } from './team/team-squad/team-squad.component';
import { LeagueTopScorersComponent } from './league/league-top-scorers/league-top-scorers.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    SidebarItemComponent,
    SearchComponent,
    NewsComponent,
    HomeFixturesComponent,
    FixtureGroupComponent,
    FixtureItemComponent,
    TeamComponent,
    HomeComponent,
    TabToggleComponent,
    TeamPlayerComponent,
    TeamStatComponent,
    LeagueComponent,
    LeagueTopScorerComponent,
    FixtureComponent,
    FixtureLineUpsComponent,
    FixtureEventsComponent,
    FixtureStatisticsComponent,
    FixtureHeadToHeadComponent,
    FixtureLineUpTeamComponent,
    FixtureLineUpPlayerComponent,
    FixtureEventItemComponent,
    FixtureStatisticsItemComponent,
    TeamSquadComponent,
    LeagueTopScorersComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
