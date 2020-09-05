import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {TeamComponent} from './team/team.component';

const appRoutes: Routes =  [
  {path: '', component: HomeComponent},
  {path: 'team/:name/:id', component: TeamComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
