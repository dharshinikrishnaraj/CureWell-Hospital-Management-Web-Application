import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//Components
import { ViewDoctorComponent } from './curewell-components/view-doctor/view-doctor.component';
import { AddDoctorComponent } from './curewell-components/add-doctor/add-doctor.component';
import { UpdateDoctorComponent } from './curewell-components/update-doctor/update-doctor.component';
import { ViewSpecializationComponent } from './curewell-components/view-specialization/view-specialization.component';
import { UpdateSurgeryComponent } from './curewell-components/update-surgery/update-surgery.component';
import { ViewTodaysSurgeryComponent } from './curewell-components/view-todays-surgery/view-todays-surgery.component';
import { HomeComponent } from './curewell-components/home/home.component';

const routes: Routes = [
  {path : 'view-doctor', component: ViewDoctorComponent},
  {path : 'add-doctor', component: AddDoctorComponent},
  {path : 'update-doctor/:doctorId/:doctorName', component: UpdateDoctorComponent},
  {path : 'view-specialization', component: ViewSpecializationComponent},
  {path : 'update-surgery/:surgeryId/:surgeryCategory/:surgeryDate/:startTime/:endTime/:doctorId', component: UpdateSurgeryComponent},
  {path : 'view-todaySurgery', component: ViewTodaysSurgeryComponent},
  
  //otherwise re-direct to home
  {path : '**', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
