"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Product } from "sanity.types";
import ProductThumb from "./ProductThumb";

function ProductsGrid({products}:{products: Product[]}){
    return(
        <div className="flex flex-col sm:flex-row flex-wrap gap-2">
            {products?.map((product)=>{
                return(
                    <AnimatePresence key={product._id}>
                        <motion.div
                        layout 
                        initial={{ opacity:0.2}}
                        animate={{ opacity: 1}}
                        exit={{opacity: 0}}
                        className="flex justify-center"
                        >
                            <ProductThumb key={product._id} product={product}/>
                        </motion.div>
                    </AnimatePresence>
                )
            })}
        </div>
    )
}

export default ProductsGrid;