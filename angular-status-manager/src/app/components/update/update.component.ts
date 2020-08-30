import { Component, OnInit } from '@angular/core';
import { StatusDataService } from '../../services/status.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  constructor(
    private statusDataService: StatusDataService,
    private router: Router
    ) {  }

  public statusData = this.dataSetup();
  public currentStatus:string = this.statusLookUp();
  public selfChecked:boolean = this.selfCheckLookUp();

  submitUpdate(){
    let temp = {};
    this.statusData.forEach((ele) => {
      if (ele.isCurrent) {
        temp = ele;
        return false;
      }
    })
    this.statusDataService.updateWholeStatus(this.statusData, this.selfChecked);
    this.router.navigateByUrl('/');
  }

  statusLookUp() {
    var message = "No select Status";
    this.statusDataService.statusData.forEach((ele) => {
      if (ele.isCurrent) {
        message = ele.name;
        return false;
      }
    })
    return message;
  }

  selfCheckLookUp() {
    let bool = false;
    this.statusData.forEach((ele) => {
      if (ele.isCurrent) {
        bool = ele.checked;
        return false;
      }
    })
    return bool;
  }

  dataSetup(){
    let temp = this.statusDataService.statusData;
    let tempArr = [];
    if (temp.length > 0 ){
      temp.forEach((ele) => {
        if (ele.isCurrent) {
          tempArr = ele.transferTo;
        }
        ele.checked = false;
      })
    }
    tempArr.forEach((ele)=> {
      temp.forEach((ele2) => {
        if (ele2.name === ele){
          ele2.checked = true;
        }
      })
    })
    return temp;
  }


  deleteStatus() {
    this.statusDataService.deleteStatus();
    this.router.navigateByUrl('/');
  }

  selectElement(item){
    if (item){
      this.statusData = this.statusData.map((ele) => {
        if (ele === item){
          item.checked = !item.checked;
          return item;
        }else return ele;
      })
    }else{
      this.selfChecked = !this.selfChecked;
    }
  }

  ngOnInit(): void {
  }

}
