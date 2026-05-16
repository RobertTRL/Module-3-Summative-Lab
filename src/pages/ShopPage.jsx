import SearchBar from "../components/SearchBar"
import ProductList from "../components/ProductList"
import { ProductsContext } from "../context/ProductsContext"
import { useState } from "react"

export default function ShopPage() {
    const [searchValue, setSearchValue] = useState({
        text: '',
        criteria: 'name'
    })
    return (
        <div className="shop-page">
            <ProductsContext>
            <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
            <ProductList />
            </ProductsContext>
        </div>
    )
}