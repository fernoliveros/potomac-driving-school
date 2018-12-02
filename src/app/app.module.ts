import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs'
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './footer/footer.component';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule, 
    MatTabsModule, 
    BrowserAnimationsModule, 
    MatCardModule, 
    MatInputModule, 
    MatDatepickerModule, 
    MatNativeDateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
