import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewDoctorComponent } from './curewell-components/view-doctor/view-doctor.component';
import { AddDoctorComponent } from './curewell-components/add-doctor/add-doctor.component';
import { UpdateDoctorComponent } from './curewell-components/update-doctor/update-doctor.component';
import { ViewSpecializationComponent } from './curewell-components/view-specialization/view-specialization.component';
import { UpdateSurgeryComponent } from './curewell-components/update-surgery/update-surgery.component';
import { ViewTodaysSurgeryComponent } from './curewell-components/view-todays-surgery/view-todays-surgery.component';
import { HomeComponent } from './curewell-components/home/home.component';
import { NavBarComponent } from './curewell-components/nav-bar/nav-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    ViewDoctorComponent,
    AddDoctorComponent,
    UpdateDoctorComponent,
    ViewSpecializationComponent,
    UpdateSurgeryComponent,
    ViewTodaysSurgeryComponent,
    HomeComponent,
    NavBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
