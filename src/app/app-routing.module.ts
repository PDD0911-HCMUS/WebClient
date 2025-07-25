import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { RetrievalTrafficComponent } from './retrieval/retrieval-traffic/retrieval-traffic.component';
import { RelTRSggComponent } from './perception/reltr-sgg/reltr-sgg.component';
import { RetrievalIRESGCL } from './retrieval/retrieval-IRESGCL/retrieval-IRESGCL.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { RetrievalIRESGComponent } from './retrieval/retrieval-iresg/retrieval-iresg.component';
import { PageManagementComponent } from './pages/page-management/page-management.component';

const routes: Routes = [
  { path: '', redirectTo: '/user/login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'rs/retrieval/traffic1', component: RetrievalTrafficComponent },
  { path: 'perception/reltr-ssg', component: RelTRSggComponent },
  { path: 'retrieval/retrieval-IRESGCL', component: RetrievalIRESGCL },
  { path: 'user/login', component: LoginComponent},
  { path: 'user/register', component: RegisterComponent},
  { path: 'retrieval/retrieval-iresg', component: RetrievalIRESGComponent},
  { path: 'pages/page-management', component: PageManagementComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
