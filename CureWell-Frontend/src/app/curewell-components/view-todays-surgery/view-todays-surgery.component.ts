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
  isUpdateFormVisible: boolean = false;
  selectedSurgeryData: any = null;

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

  
  openUpdate(surgery: any) {
    this.isUpdateFormVisible = true;
    this.selectedSurgeryData = surgery; // Pass the entire surgery object to the child
    
  }

  closeUpdateForm(): void {
    this.isUpdateFormVisible = false;
    setTimeout(() => {
      this.isUpdateFormVisible = false;
    }, 10);
  }

}
