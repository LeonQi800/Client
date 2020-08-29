import {Injectable} from '@angular/core'

@Injectable()
export class StatusDataService {
    statusData = [
        {name: "a", checked: false, isCurrent: true, isSelect: false, transferTo : []}
    ]

    addStatus (element){
        this.statusData.forEach(ele => {
            if (ele.checked){
                element.transferTo.push(ele.name);
            }
            ele.checked = false;
        })
        this.statusData.push(element);
    }

    updateStatus (obj){
        this.statusData = obj;
    }

    updateWholeStatus (obj, flag){
        console.log(obj)
        console.log(flag)
        let tempTrans = []
        obj.forEach(ele => {
            if ((ele.checked && !ele.isCurrent) || (ele.isCurrent && flag)){
                tempTrans.push(ele.name);
            }
            ele.checked = false;
        })

        obj.forEach(ele => {
            if (ele.isCurrent){
                ele.transferTo = tempTrans;
                return false;
            }
        })
        this.statusData = obj;
    }

    deleteStatus (){
        this.statusData = this.statusData.filter( (ele)=> ele.isCurrent !== true );
    }
}