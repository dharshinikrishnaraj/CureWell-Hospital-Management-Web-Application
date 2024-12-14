import { Component, OnInit } from '@angular/core';
import { CurewellService } from '../../curewell-services/curewell.service';
import { ISurgery } from '../../curewell-interfaces/surgery';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-todays-surgery',
  templateUrl: './view-todays-surgery.component.html',
  styleUrl: './view-todays-surgery.component.css'
})
export class ViewTodaysSurgeryComponent implements OnInit{
  
  surgeryList: ISurgery[] = [];
  errMsg: string = " ";
  showMsgDiv: boolean = false;

  constructor(private _service: CurewellService, private _router: Router){}

  ngOnInit(): void {
    this.getTodaySurgery();
  }

  getTodaySurgery(){
    this._service.getSurgeriesForToday().subscribe({
      next: responseData => {
        this.surgeryList = responseData;
        this.showMsgDiv = true;
      },
      error: responseError => {
        this.surgeryList = [];
        this.errMsg = responseError
      },
      complete: () => console.log("Surgery Details details Successfully!")
  });
  }

  editSurgery(surgeryId: number, doctorId: number, surgeryDate: Date, startTime: number, endTime: number, surgeryCategory: string){
    this._service.editSurgery(surgeryId, doctorId, surgeryDate, startTime, endTime, surgeryCategory).subscribe(
      responseData => {
        this._router.navigate(['/update-surgery', surgeryId]);
      }
    );
  }
}
