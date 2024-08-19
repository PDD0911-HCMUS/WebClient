import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RetrievalTrafficComponent } from './rs/retrieval-traffic/retrieval-traffic.component';
import { HomeComponent } from './home/home.component';
import { HeaderMenuComponent } from './header-menu/header-menu.component';
import { FooterMenuComponent } from './footer-menu/footer-menu.component';
import { TrafficSggComponent } from './sgg/traffic-sgg/traffic-sgg.component';
import { RetrievalByImageComponent } from './rs/retrieval-by-image/retrieval-by-image.component';

@NgModule({
  declarations: [
    AppComponent,
    RetrievalTrafficComponent,
    TrafficSggComponent,
    HomeComponent,
    HeaderMenuComponent,
    FooterMenuComponent,
    RetrievalByImageComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
