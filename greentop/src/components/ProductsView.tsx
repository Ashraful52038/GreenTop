"use client";
import { CategorySelectorComponent } from "@/components/ui/category-selector";
import { Product ,Category } from "@/sanity.types";
import ProductsGrid from "./ProductsGrid";

interface ProductsViewProps{
    products: Product[];
    categories: Category[];
}
const ProductsView = ({products, categories}: ProductsViewProps)=>{
    return(
        <div className="flex flex-col ">
            {/* category */}
            <div className="w-full max-w-[1168px] mb-1 bg-green-600 shadow-md mx-auto">
                <CategorySelectorComponent categories={categories}/>
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