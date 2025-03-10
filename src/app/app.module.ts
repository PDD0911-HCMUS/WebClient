import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
// Import Angular Material
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RetrievalTrafficComponent } from './retrieval/retrieval-traffic/retrieval-traffic.component';
import { HomeComponent } from './home/home.component';
import { HeaderMenuComponent } from './header-menu/header-menu.component';
import { FooterMenuComponent } from './footer-menu/footer-menu.component';
import { RelTRSggComponent } from './perception/reltr-sgg/reltr-sgg.component';
import { RetrievalIRESGCL } from './retrieval/retrieval-IRESGCL/retrieval-IRESGCL.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MsFloranceV2RgComponent } from './perception/ms-florance-v2-rg/ms-florance-v2-rg.component';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [
    AppComponent,
    RetrievalTrafficComponent,
    RelTRSggComponent,
    HomeComponent,
    HeaderMenuComponent,
    FooterMenuComponent,
    RetrievalIRESGCL,
    MsFloranceV2RgComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatPaginatorModule,
    MatTableModule,
    MatTooltipModule,
    MatMenuModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
