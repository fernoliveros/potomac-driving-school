import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/common/header/header.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { Home1Component } from './components/pages/home1/home1.component';
import { Home2Component } from './components/pages/home2/home2.component';
import { AboutComponent } from './components/pages/about/about.component';
import { TeensComponent } from './components/pages/teens/teens.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { BloglistComponent } from './components/pages/bloglist/bloglist.component';
import { BlogdetailsComponent } from './components/pages/blogdetails/blogdetails.component';
import { AdultsComponent } from './components/pages/adults/adults.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { PostComponent } from './components/common/post/post.component';
import { CardComponent } from './components/common/card/card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule} from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker'; 
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    Home1Component,
    Home2Component,
    AboutComponent,
    TeensComponent,
    ContactComponent,
    BloglistComponent,
    BlogdetailsComponent,
    AdultsComponent,
    RegisterComponent,
    PostComponent,
    CardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
