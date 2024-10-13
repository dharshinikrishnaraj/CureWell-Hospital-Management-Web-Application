import { Component, OnInit } from '@angular/core';
import { CurewellService } from '../../curewell-services/curewell.service';
import { Router, ActivatedRoute } from '@angular/router';  

@Component({
  selector: 'app-update-doctor',
  templateUrl: './update-doctor.component.html',
  styleUrl: './update-doctor.component.css'
})
export class UpdateDoctorComponent implements OnInit {

  doctorId: number = 0;
  doctorName: string = "";
  status: boolean = false;
  errorMsg: string = "";

  constructor(private _service: CurewellService, private _router: Router, private route: ActivatedRoute){}

  ngOnInit() {
    //Fetch Id from url
    this.doctorId = this.route.snapshot.params['doctorId'];
    this.doctorName = this.route.snapshot.params['doctorName'];
  }
  
  editDoctorDetails(){
    this._service.editDoctorDetails(this.doctorId, this.doctorName).subscribe(
      responseData =>{
        this.status = responseData;
        if(this.status){
          alert("Doctor's name updated successfully!");
          this._router.navigate(['/view-doctor']);
        }
        else{
          alert("Doctor's name not updated successfully!");
          this._router.navigate(['/view-doctor']);
        }
      },
      responseError=> {
        this.errorMsg = responseError;
        alert("Some error occured");
        this._router.navigate(['/view-doctor']);
      },
      ()=> console.log("Updated doctor details successfully.")
    );
  }
 

}
