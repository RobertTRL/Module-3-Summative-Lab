import { useState, useEffect, createContext } from 'react'

export function ProductsContext({ children }) {
    const productContext = createContext()

    const [productData, setProductData] = useState([])

    useEffect(() => {
        fetch('http://localhost:3001/coffee')
            .then(res => {
                if (!res.ok) {
                    throw new Error('Something went wrong')
                } else { return res.json() }})
            .then(res => setProductData(res))
            .catch(err => console.log(err))
    }, [])

    return (
        <productContext.Provider value={{ productData, setProductData }}>
            {children}
        </productContext.Provider>
    )
}

export function useProducts() {
    const context = useContext(ProductsContext)
    return context

}