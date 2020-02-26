export interface User {
    id: number;
    name: string;
    userName: string;
    password: string;
    role: string;
    branch: Branch;
}

export interface Branch {
    id: number;
    name: string;
    location: string;
    contact: number;
    password: string;
    startDate: string;
}

export class Login {
    constructor(public name: string, public password: string) { }
}

export interface Category {
    id: number;
    name: string;
    expanded: boolean;
    subcategories: SubCategory[];
}

export interface SubCategory {
    id: number;
    name: string;
    noOfProducts: number;
    parent: number;
}

export class Product {
    constructor(
        public id: number,
        public name: string,
        public description: string,
        public barcode: string,
        public quantity: number,
        public orderedQuantity: number,
        public newArrival: boolean,
        public uom: string,
        public imagePath: string,
        public categoryId: number,
        public categoryName: string,
        public inCart: boolean,
        public category: any,
        public image: any,
    ) { }

}

export interface Order {
    orderId: number;
    createdOn: Date;
    deliveredOn: Date;
    status: 'Created' | 'Completed';
}

export class PurchaseRequest {
    constructor(
        public branch: Branch,
        public status: string,
        public purchaseRequestItems: PurchaseItems[]) { }
}

export class PurchaseItems {
    constructor(
        public id: ProductRequest,
        public requestedQuantity: number
    ) { }

}

export class ProductRequest {
    constructor(
        public id: number,
        public orderId: number,
        public productId: number
    ) { }
}

