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
import { FixtureGroupComponent } from './fixture-group/fixture-group.component';
import { FixtureItemComponent } from './fixture-group/fixture-item/fixture-item.component';
import { TeamComponent } from './team/team.component';
import { HomeComponent } from './home/home.component';
import { TabToggleComponent } from './shared/tab-toggle/tab-toggle.component';
import { TeamPlayerComponent } from './team/team-player/team-player.component';
import { TeamStatComponent } from './team/team-stat/team-stat.component';
import {AppRoutingModule} from './app-routing.module';

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
    TeamStatComponent
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
