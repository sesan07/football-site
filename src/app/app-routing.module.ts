import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {TeamComponent} from './team/team.component';
import {LeagueComponent} from './league/league.component';

const appRoutes: Routes =  [
  {path: '', component: HomeComponent},
  {path: 'team/:name/:id', component: TeamComponent},
  {path: 'league/:name/:id', component: LeagueComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
