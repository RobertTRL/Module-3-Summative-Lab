import ProductCard from "./ProductCard"
import { useProducts } from "../context/ProductsContext"

export default function ProductList({ searchValue }) {
    const { productsData } = useProducts()
    const filteredProducts = productsData.filter(product => product[searchValue.criteria].toLowerCase().includes(searchValue.text.toLowerCase()))
    return (
        <div className="product-list">
            {filteredProducts.map(product => <ProductCard key={product.id} coffee={product} />) }
        </div>
    )
}