import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { RetrievalTrafficComponent } from './retrieval/retrieval-traffic/retrieval-traffic.component';
import { RelTRSggComponent } from './perception/reltr-sgg/reltr-sgg.component';
import { RetrievalIRESGCL } from './retrieval/retrieval-IRESGCL/retrieval-IRESGCL.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'rs/retrieval/traffic1', component: RetrievalTrafficComponent },
  { path: 'perception/reltr-ssg', component: RelTRSggComponent },
  { path: 'retrieval/retrieval-IRESGCL', component: RetrievalIRESGCL }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
