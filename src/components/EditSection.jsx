import { useId , useState } from "react"
import { useProducts } from "../context/ProductsContext"

export default function EditSection() {
    const selectid = useId(), nameid = useId(), descriptionid = useId(), priceid = useId(), originid = useId()
    const { productsData, setProductsData } = useProducts()
    const [productid, setProductid] = useState(1)
    const [details, setDetails] = useState(productsData[0] || {})

    const originalProduct = productsData.find(product => product.id == productid)

    function handleSelect(e) {
        const id = Number(e.target.value)
        setProductid(id)
        const selected = productsData.find(product => product.id == id)
        setDetails(selected)
    }

    function handleChange(e) {
        setDetails({
            ...details,
            [e.target.name]: e.target.value
        })
    }

    function handleSubmit(e) {
        e.preventDefault()
        fetch(`http://localhost:3001/coffee/${productid}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: details.name,
                description: details.description,
                price: Number(details.price),
                origin: details.origin
            })
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error("Something went wrong")
                }
                return res.json()
            })
            .then(data => {
                setProductsData(productsData.map(p => String(p.id) === String(productid) ? data : p))
                setDetails(data)
        
            })
            .catch(err => console.log(err))
    }    

    const hasChanged = originalProduct && ( details.name !== originalProduct.name || details.description !== originalProduct.description || details.price !== originalProduct.price || details.origin !== originalProduct.origin )
    
    return (
        <div className="edit-section">
            <h2>Edit Coffee</h2>
            <label htmlFor={selectid}>Select Coffee</label>
            <select name="edit-select" id={selectid} value={productid} onChange={handleSelect}>
                {productsData.map(product => <option key={product.id} value={Number(product.id)}>{product.name}</option>)}
            </select>
            <label htmlFor={nameid}>Name</label>
            <input type="text" value={details.name || ""} name="name" onChange={handleChange} id={nameid}/>
            <label htmlFor={descriptionid}>Description</label>
            <input type="text" value={details.description || ""} name="description" onChange={handleChange} id={descriptionid}/>
            <label htmlFor={originid}>Origin</label>
            <input type="text" value={details.origin || ""} name="origin" onChange={handleChange} id={originid}/>
            <label htmlFor={priceid}>Price</label>
            <input type="number" value={details.price || ""} name="price" onChange={handleChange} id={priceid}/>
            <button disabled={!hasChanged} className="submit-button" onClick={handleSubmit}>Edit Product</button>
        </div>
    )
}