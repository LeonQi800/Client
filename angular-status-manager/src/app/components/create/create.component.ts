import { Component, OnInit } from '@angular/core';
import { StatusDataService } from '../../services/status.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  public createdStatus:string = "Created Status";
  public createdInput:string = "";
  public selfChecked:boolean = false;
  public statusData = this.dataSetup();
  public messageFlag = false;

  constructor(
    private statusDataService: StatusDataService,
    private router: Router
    ) {  }

  ngOnInit(): void {
  }

  dataSetup(){
    let temp = this.statusDataService.statusData;
    temp.forEach((ele) => {
      ele.checked = false;
    })
    return temp;
  }

  submitCreate (){
    this.messageFlag = false;
    let temp = {
      name: this.createdInput,
      isCurrent: true,
      checked: false,
      transferTo: []
    }

    if(this.checkExistName(this.createdInput) && this.createdInput !== ""){
      if(this.selfChecked){
        temp.transferTo.push(this.createdInput);
      }
      this.statusDataService.addStatus(temp);
      this.createdInput = "";
      this.selfChecked = false;
      this.router.navigateByUrl('/');
    }else{
      this.messageFlag = true;
    }
  }

  checkExistName (item){
    var flag = true;
    this.statusData.forEach((ele) => {
      if (ele.name === item){
        flag = false;
        return false;
      }
    })
    return flag;
  }

  selectElement(item){
    if (item){
      this.messageFlag = false;
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



}
