"use client";

import { Category, Product } from "@/sanity.types";
// import { Category, Product } from "sanity.types";
import ProductsGrid from "./productGrid";

interface ProductsViewProps{
    products: Product[];
    categories: Category[];
}
const ProductsView = ({products, categories}: ProductsViewProps)=>{
    return(
        <div className="flex flex-col">
            {/* category */}
            <div className="w-full sm:w-[200px]">
                {/* <CategorySelectorComponent categories={categories}/> */}
            </div>
            {/* products */}
            <div className="flex-1">
                <div>
                    <ProductsGrid products={products}/>

                    <hr className="w-1/2 sm:w-3/4"/>
                </div>
            </div>
        </div>
    );
};

export default ProductsView;