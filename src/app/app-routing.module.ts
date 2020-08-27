import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Home1Component } from './components/pages/home1/home1.component';
import { Home2Component } from './components/pages/home2/home2.component';
import { AboutComponent } from './components/pages/about/about.component';
import { TeensComponent } from './components/pages/services/teens.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { BloglistComponent } from './components/pages/bloglist/bloglist.component';
import { BlogdetailsComponent } from './components/pages/blogdetails/blogdetails.component';
import { AdultsComponent } from './components/pages/adults/adults.component';
import { RegisterComponent } from './components/pages/register/register.component';

const routes: Routes = [
  { path: '', component: Home1Component },
  { path: 'home1', component: Home1Component },
  { path: 'home2', component: Home2Component },
  { path: 'about', component: AboutComponent },
  { path: 'teens', component: TeensComponent },
  { path: 'adults', component: AdultsComponent },
  { path: 'bloglist', component: BloglistComponent },
  { path: 'blogdetails', component: BlogdetailsComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'contact', component: ContactComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
