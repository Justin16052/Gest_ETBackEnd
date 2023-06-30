import { InformationComponent } from './pages/information/information.component';
import { ContactComponent } from './pages/contact/contact.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { AuthSideBarGuardsService } from './services/auth-sidebar-guards.service';
import { AdminProfileComponent } from './components/admin-profile/admin-profile.component';
import { AdminDoctorantsComponent } from './components/admin-doctorants/admin-doctorants.component';
import { AdminLayoutComponent } from './pages/admin-layout/admin-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardsService } from './services/auth-guards.service';
import { AdminAbsencesComponent } from './components/admin-absences/admin-absences.component';
import { AdminNotesComponent } from './components/admin-notes/admin-notes.component';
import { AdminDocumentsComponent } from './components/admin-documents/admin-documents.component';


const routes: Routes = [
 // { redirectTo: 'index', pathMatch: 'full' },
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  {
   path: 'menu', canActivate: [AuthGuardsService], component: AdminLayoutComponent, children: [
      { path: 'etudiants',canActivate: [AuthSideBarGuardsService],component: AdminDoctorantsComponent},
      { path: 'profile', component: AdminProfileComponent },
      { path: 'etudiants/absences/:id1/:id2',component: AdminAbsencesComponent},
      { path: 'etudiants/notes/:id',component: AdminNotesComponent},
      { path: 'etudiants/documents/:id',component: AdminDocumentsComponent}
    ]
  },
  { path: 'contact', component: ContactComponent },
  { path: 'annonce', component: InformationComponent },
  { path: 'notfound', component: NotfoundComponent },
  { path: '**', redirectTo: 'notfound' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }