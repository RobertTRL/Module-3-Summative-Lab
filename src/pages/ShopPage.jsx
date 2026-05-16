import SearchBar from "../components/SearchBar"
import ProductList from "../components/ProductList"

export default function ShopPage() {
    return (
        <div className="shop-page">
            <SearchBar />
            <ProductList />
        </div>
    )
}