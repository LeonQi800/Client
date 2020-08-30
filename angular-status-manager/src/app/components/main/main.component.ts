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

  public firstAns:boolean = false;
  public secondAns = [];
  public thirdAns:boolean = false;

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
    this.firstSelectStatus = item;
    this.restAnsByIndex(1);
    this.findRouteByIndex(1, this.firstSelectStatus);
  }

  selectSecondItem(item){
    this.secondSelectStatus = item;
    this.restAnsByIndex(2);
    this.findRouteByIndex(2, this.secondSelectStatus);

  }

  selectCurrentItem(item){
    this.thirdAns = false;
    this.thirdSelectStatus = item;
    this.changeRoute(this.thirdSelectStatus);
    if (this.changeRoute(this.thirdSelectStatus)){
      this.currentStatus = item;
      this.resetAns();
      this.thirdAns = true;
      this.findRouteByIndex(1, this.firstSelectStatus);
      this.findRouteByIndex(2, this.secondSelectStatus);
    }

  }


  findRouteByIndex(index, selectedName){
    if (this.currentStatus === "No current status"){
      this.resetAns();
    }else{
      this.findRoutingPath(index, selectedName);
    }
  }

  changeRoute(selectedName){
    let tempTransArr = [];
    this.statusData.forEach(ele =>{
      if (ele.name === this.currentStatus){
        tempTransArr = ele.transferTo;
      }
    })
    if (tempTransArr.indexOf(selectedName) !== -1){
      return true;
    }else return false;

  }

  findRoutingPath(index, selectedName){
    if (selectedName === "No Select status"){
      this.restAnsByIndex(index)
    }else {
      let tempTransArr = [];
      this.statusData.forEach(ele =>{
        if (ele.name === this.currentStatus){
          tempTransArr = ele.transferTo;
        }
      })
      if (tempTransArr.length > 0){
        let currentPath = [];
        let count = 0;
        let search = true;
        this.goAndFind(tempTransArr, selectedName, this.currentStatus, currentPath, index, count, search);
      }
    }
  }

  goAndFind(tempTransArr, selectedName, current, currentPath, selectIndex, count, search){
    let newTempTransArr = [];
    let newSearch = search;
    currentPath.push(current);

    tempTransArr.forEach((ele) => {
      
      if( ele === selectedName ){
        currentPath.push(selectedName);
        this.setRouteAns(selectIndex, currentPath);
        newSearch = false;
      }

      let newtPath = this.unique(currentPath).filter((ele) => ele !== undefined);


      if ((ele !== selectedName) && (newtPath.indexOf(ele) === -1) && (count < 10) && newSearch){
        this.statusData.forEach(ele2 => {
          if ((ele2.name === ele) && (ele2.transferTo.length > 0) ){
            newTempTransArr = ele2.transferTo;
            count++;
            this.goAndFind(newTempTransArr, selectedName, ele2.name, newtPath, selectIndex, count, newSearch);
          }
        })
      }
    })
  }

  unique (arr) {
    return Array.from(new Set(arr))
  }

  setRouteAns(index, sortRoute) {
    switch(index){
      case 1:{
        this.firstAns = true;
        break;
      }
      case 2:{
        this.secondAns = sortRoute;
        break;
      }
      default:{
        this.thirdAns = true;
        break;
      }
    }
  }

  resetAns() {
    this.firstAns = false;
    this.secondAns = [];
    this.thirdAns = false;
  }

  restAnsByIndex(index) {
    switch(index){
      case 1:{
        this.firstAns = false;
        break;
      }
      case 2:{
        this.secondAns = [];
        break;
      }
      default:{
        this.thirdAns = false;
        break;
      }
    }
  }
}
