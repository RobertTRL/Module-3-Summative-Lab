import { useId , useState } from "react"
import { useProducts } from "../context/ProductsContext"

export default function AddForm() {
    const { productsData, setProductsData } = useProducts()
    const nameid = useId() , descriptionid = useId() , countryid = useId() , priceid = useId()
    const [details, setDetails] = useState({
        name: "",
        description: "",
        origin: "",
        price: ""
    })

    const [touched, setTouched] = useState({
        name: false,
        description: false,
        origin: false,
        price: false
    })
    
    function handleChange(e) {
        setDetails({
            ...details,
            [e.target.name]: e.target.value
        })
    }

    function handleBlur(e) {
        setTouched({
            ...touched,
            [e.target.name]: true
        })
    }

    function handleSubmit(e) {
        e.preventDefault()
        if (details.name && details.description && details.origin && details.price) {
            const newItem = {
                name: details.name,
                description: details.description,
                origin: details.origin,
                price: details.price,
                image: productsData[Math.floor(Math.random() * productsData.length)].image
            }
            fetch("http://localhost:3001/coffee", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newItem)
            })
                .then(res => {
                    if (!res.ok) {
                        throw new Error("Something went wrong")
                    }
                    return res.json()
                })
                .then(data => {
                    setProductsData([...productsData, data])
                    setDetails({
                        name: "",
                        description: "",
                        origin: "",
                        price: ""
                    })
                    setTouched({
                        name: false,
                        description: false,
                        origin: false,
                        price: false
                    })
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    return (
        <div className="add-form">
            <form onSubmit={handleSubmit}>
                <h2>Add Product</h2>
                <label htmlFor={nameid}>Name</label>
                <input type="text" id={nameid} placeholder="Enter product name" name="name" value={details.name} onChange={handleChange} onBlur={handleBlur} />
                <p className={touched.name && !details.name ? "visible" : ""}>Please enter a name</p>
                
                <label htmlFor={descriptionid}>Description</label>
                <input type="text" id={descriptionid} placeholder="Enter product description" name="description" value={details.description} onChange={handleChange} onBlur={handleBlur} />
                <p className={touched.description && !details.description ? "visible" : ""}>Please enter a description</p>
                
                <label htmlFor={countryid}>Country of Origin</label>
                <input type="text" id={countryid} placeholder="Enter country of origin" name="origin" value={details.origin} onChange={handleChange} onBlur={handleBlur} />
                <p className={touched.origin && !details.origin ? "visible" : ""}>Please enter a country of origin</p>
                
                <label htmlFor={priceid}>Price in Ksh</label>
                <input type="number" id={priceid} placeholder="Enter product price in Ksh" name="price" value={details.price} onChange={handleChange} onBlur={handleBlur} />
                <p className={touched.price && !details.price ? "visible" : ""}>Please enter a price</p>
                
                <button type="submit" className="submit-button">Add Product</button>
            </form>

        </div>
    )
}