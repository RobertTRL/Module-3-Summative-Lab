import { useState, useEffect, createContext, useContext } from 'react'

const ProductsContext = createContext()

export function ProductsProvider({ children }) {

    const [productsData, setProductsData] = useState([])

    useEffect(() => {
        fetch('http://localhost:3001/coffee')
            .then(res => {
                if (!res.ok) {
                    throw new Error('Something went wrong')
                } else { return res.json() }})
            .then(res => setProductsData(res))
            .catch(err => console.log(err))
    }, [])

    return (
        <ProductsContext.Provider value={{ productsData, setProductsData }}>
            {children}
        </ProductsContext.Provider>
    )
}

export function useProducts() {
    const context = useContext(ProductsContext)
    return context
}