import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthInterceptorService} from './shared/repository/auth-interceptor.service';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SidebarItemComponent } from './sidebar/sidebar-item/sidebar-item.component';
import { SearchComponent } from './search/search.component';
import { NewsComponent } from './news/news.component';
import { HomeFixturesComponent } from './home-fixtures/home-fixtures.component';
import { FixtureGroupComponent } from './fixture-group/fixture-group.component';
import { FixtureItemComponent } from './fixture-group/fixture-item/fixture-item.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    SidebarItemComponent,
    SearchComponent,
    NewsComponent,
    HomeFixturesComponent,
    FixtureGroupComponent,
    FixtureItemComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
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
