import { Component, OnInit } from '@angular/core';
import { StatusDataService } from '../../services/status.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public statusData = this.statusDataService.statusData;
  public currentStatus:string = this.statusLookUp();
  public firstSelectStatus:string = "No Select status";
  public secondSelectStatus:string = "No Select status";
  public thirdSelectStatus:string = "No Select status";


  constructor(
    private statusDataService: StatusDataService,
    private router: Router
  ) {  }

  ngOnInit(): void {
  }

  statusLookUp() {
    var message = "No current status";
    this.statusData.forEach((ele) => {
      if (ele.isCurrent) {
        message = ele.name;
        return false;
      }
    })
   return message;
  }

  selectUpdateItem(item){
    this.statusData = this.statusData.map((ele) => {
      if (ele.name === item){
          ele.isCurrent = true;
      }else{
        ele.isCurrent = false;
      }
      return ele;
    })
    this.statusDataService.updateStatus(this.statusData);
    this.router.navigateByUrl('/update');
  }

  selectFirstItem(item){
    console.log(item);
    this.firstSelectStatus = item;
  }

  selectSecondItem(item){
    console.log(item)
  }

  selectCurrentItem(item){
    this.thirdSelectStatus = item;
    this.currentStatus = item;
  }
}
