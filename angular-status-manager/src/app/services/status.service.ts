import {Injectable} from '@angular/core'

@Injectable()
export class StatusDataService {

    statusData = [
        {name: "a", checked: false, isCurrent: true, isSelect: false, transferTo : ["c", "d"]},
        {name: "b", checked: false, isCurrent: false, isSelect: false, transferTo : ["b", "d"]},
        {name: "c", checked: false, isCurrent: false, isSelect: false, transferTo : ["b"]},
        {name: "d", checked: false, isCurrent: false, isSelect: false, transferTo : ["c"]}
    ]

    // this.nodes = nodes;//保存所有节点
    // this.line = {};//保存所有节点关系
    // this.res = [];//最短路径结果
    // this.hasRes = false;//是否 至少有一个可以到达的路径

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