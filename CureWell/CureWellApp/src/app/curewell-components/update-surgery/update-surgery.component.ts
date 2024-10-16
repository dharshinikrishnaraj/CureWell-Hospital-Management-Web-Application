import { Component } from '@angular/core';
import { CurewellService } from '../../curewell-services/curewell.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-surgery',
  templateUrl: './update-surgery.component.html',
  styleUrl: './update-surgery.component.css'
})
export class UpdateSurgeryComponent {

  surgeryId: number = 0;
  doctorId: number = 0;
  surgeryDate!: Date;
  startTime: number = 0;
  endTime: number = 0;
  surgeryCategory: string = "";
  status: boolean = false;
  errorMsg: string = "";

  constructor(private _service: CurewellService, private _router: Router, private route: ActivatedRoute){}

  ngOnInit(){
    this.surgeryId = this.route.snapshot.params['surgeryId'];
    this.doctorId = this.route.snapshot.params['doctorId'];
    this.surgeryDate = this.route.snapshot.params['surgeryDate'];
    this.startTime = this.route.snapshot.params['startTime'];
    this.endTime = this.route.snapshot.params['endTime'];
    this.surgeryCategory = this.route.snapshot.params['surgeryCategory'];
  }

  editSurgery(){
    this._service.editSurgery(this.surgeryId, this.doctorId, this.surgeryDate, this.startTime, this.endTime, this.surgeryCategory).subscribe(
      responseData => {
        this.status = responseData;
        if(this.status){
          alert("Surgery details updated successfully!");
          this._router.navigate(['/view-todaySurgery']);
        }
        else{
          alert("Surgery details not updated successfully!");
          this._router.navigate(['/view-todaySurgery']);
        }
      },
      responseError =>{
        this.errorMsg = responseError;
        alert("Some error occured");
        this._router.navigate(['/view-todaySurgery']);
      },
      () => console.log("Updated surgery details successfully!")
    )
  }
}
