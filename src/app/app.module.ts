import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { AuthGuardsService } from './services/auth-guards.service';
import { AuthenticationService } from './services/authentication.service';
import { AdminLayoutComponent } from './pages/admin-layout/admin-layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './pages/login/login.component';
import * as $ from 'jquery';
import { MenubarComponent } from './components/menubar/menubar.component';
import { AdminDoctorantsComponent } from './components/admin-doctorants/admin-doctorants.component';
import { AdminProfileComponent } from './components/admin-profile/admin-profile.component';

import { ContactComponent } from './pages/contact/contact.component';
import { InformationComponent } from './pages/information/information.component';

import { JwPaginationComponent } from 'jw-angular-pagination';

import { AdminAbsencesComponent } from './components/admin-absences/admin-absences.component';
import { AdminNotesComponent } from './components/admin-notes/admin-notes.component';
import { AdminDocumentsComponent } from './components/admin-documents/admin-documents.component';
import { MatSelectModule,MatFormFieldModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    LoginComponent,
    AdminLayoutComponent,
    NotfoundComponent,
    SidebarComponent,
    MenubarComponent,
    AdminDoctorantsComponent,
    AdminProfileComponent,
    ContactComponent,
    InformationComponent,
    JwPaginationComponent,
    AdminAbsencesComponent,
    AdminNotesComponent,
    AdminDocumentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatFormFieldModule,
  ],
  providers: [AuthenticationService, AuthGuardsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
