import { Component, ViewEncapsulation } from '@angular/core';
import { CurewellService } from '../../curewell-services/curewell.service';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrl: './add-doctor.component.css',
  encapsulation: ViewEncapsulation.Emulated
})
export class AddDoctorComponent {
  
  doctorName: string = "";
  status: boolean = false;
  showMsgDiv: boolean = false;
  msg: string = "";
  errAddMsg: string = "";

  constructor(private _service: CurewellService){}

  addDoctor(){
    //console.log("Doctor Name:", this.doctorName); 
    if(this.doctorName)
    {
      this._service.addDoctor(this.doctorName).subscribe({
        next: response => {
          this.status = response;
          console.log(this.doctorName);
          this.showMsgDiv = true;
          this.msg = "Doctor successfully added";
        },
        error: error => {
          this.errAddMsg = error;
          this.msg = "Some error occured"
        },
        complete:()=> console.log("Add Doctor completed")
      });
    }
  }
}
