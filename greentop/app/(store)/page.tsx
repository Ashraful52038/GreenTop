import ProductsView from "../../src/components/ProductsView";
import { getAllProducts } from "../../sanity/lib/products/getAllProduct";
import { getAllCategories } from "../../sanity/lib/products/getAllCategories";


export default async function Home() {
  const products = await getAllProducts();
  const categories= await getAllCategories();

  return (
    <div>
     <h1>Hello World </h1>
     <div className="flex flex-col items-center justify-top min-h-screen bg-gray-100 p-4">
      <ProductsView products={products} categories={categories}/>
     </div>
    </div>
  );
}
