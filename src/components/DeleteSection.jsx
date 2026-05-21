import { useProducts } from "../context/ProductsContext"
import { useState } from "react"


export default function DeleteSection() {
    const { productsData, setProductsData } = useProducts()
    const [productid, setProductid] = useState(1)
    
    function handleSelect(e) {
        setProductid(Number(e.target.value))
    }

    function handleDelete(e) {
        fetch(`http://localhost:3001/coffee/${productid}`, {
            method: "DELETE"
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error("Something went wrong")
                }
                setProductsData(productsData.filter(product => String(product.id) !== String(productid)))
                setProductid(1)
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="delete-section">
            <h2>Delete Coffee</h2>
            <label htmlFor="delete-select">Select Coffee</label>
            <select name="delete-select" id="delete-select" value={productid} onChange={handleSelect}>
                {productsData.map(product => <option key={product.id} value={product.id}>{product.name}</option>)}
            </select>
            <button className="delete-button" onClick={handleDelete}>Delete Product</button>
        </div>
    )
}