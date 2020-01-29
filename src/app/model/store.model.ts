export interface User {
    id: number;
    name: string;
    isAdmin: boolean;
}

export class Login {
    constructor(public name: string, public password: string) { }
}

export interface Category {
    id: number;
    name: string;
    expanded: boolean;
    subCategory: SubCategory[]
}

export interface SubCategory {
    id: number;
    name: string;
    noOfProducts: number;
}

export interface Product {
    id: number;
    name: string;
    description: string;
    barcode: string;
    avilableQuantity: number;
    orderedQuantity: number;
    isNew: boolean;
    uom: string;
    imgUrl: string;
    categoryId: number;
    categoryName: string;
    inCart: boolean;
}