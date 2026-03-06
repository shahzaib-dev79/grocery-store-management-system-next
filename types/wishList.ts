export interface wishListItem {
    _id: string;
    user:string;
    product: string;
    createdAt: string;
    updatedAt:string;
};

export interface Product {
   _id: string;
   name:string;
   price:number;
   image: string;
};

export interface wishListResponse{
    success: boolean;
    message: string;
    totalItems?: number;
    data: wishListItem[];
};

export interface addWishListResponse {
    success: boolean;
    message: string;
    data: wishListItem;
};
