import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { RetrievalTrafficComponent } from './rs/retrieval-traffic/retrieval-traffic.component';
import { TrafficSggComponent } from './sgg/traffic-sgg/traffic-sgg.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'rs/retrieval/traffic', component: RetrievalTrafficComponent },
  { path: 'sg/sgg/traffic', component: TrafficSggComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
