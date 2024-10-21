export interface Product {
    id: number;
    name: string;
    price: number;
    desc: string;
    image: string;
}
export interface Page<T> {
    content: T[];
    totalElements: number;
    page: number;
    size: number;
}