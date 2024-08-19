import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { RetrievalTrafficComponent } from './rs/retrieval-traffic/retrieval-traffic.component';
import { TrafficSggComponent } from './sgg/traffic-sgg/traffic-sgg.component';
import { RetrievalByImageComponent } from './rs/retrieval-by-image/retrieval-by-image.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'rs/retrieval/traffic1', component: RetrievalTrafficComponent },
  { path: 'sg/sgg/traffic', component: TrafficSggComponent },
  { path: 'rs/retrieval/traffic', component: RetrievalByImageComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
