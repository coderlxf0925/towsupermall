import { request } from "./request";

export function getDetail(iid) {
    return request({
        url: '/detail',
        params: {
            iid
        }
    })
}
export function getRecommend() {
    return request({
        url: 'recommend',

    })
}

export class goods {
    constructor(itemInfo, columns, service) {
        this.title = itemInfo.title;
        this.desc = itemInfo.desc;
        this.newPrice = itemInfo.price;
        this.oldprice = itemInfo.oldPrice;
        this.discount = itemInfo.discountDesc;
        this.discountBgColor = itemInfo.discountBgColor
        this.columns = columns
        this.services = service
        this.realPrice = itemInfo.lowNowPrice;
    }
}



//ES6中使用类
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}

const p = new Person('why', 189)