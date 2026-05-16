import SearchBar from "../components/SearchBar"
import ProductList from "../components/ProductList"
import { useState } from "react"
import '../styles/ShopPage.css'

export default function ShopPage() {
    const [searchValue, setSearchValue] = useState({
        text: '',
        criteria: 'name'
    })
    return (
        <div className="shop-page">
            <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
            <ProductList searchValue={searchValue} />
        </div>
    )
}