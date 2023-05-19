import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {TeamComponent} from './team/team.component';
import {LeagueComponent} from './league/league.component';
import {FixtureComponent} from './fixture/fixture.component';

const appRoutes: Routes =  [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'team/:name/:id', component: TeamComponent},
  {path: 'league/:name/:id', component: LeagueComponent},
  {path: 'fixture/:id', component: FixtureComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { relativeLinkResolution: 'legacy' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
