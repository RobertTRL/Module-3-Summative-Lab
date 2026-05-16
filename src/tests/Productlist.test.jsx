import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import ProductList from '../components/ProductList'
 
jest.mock('react-router-dom', () => ({
    useNavigate: () => jest.fn()
}))
 
jest.mock('../context/ProductsContext', () => ({
    useProducts: () => ({
        productsData: [
            { id: 1, name: 'Arabica Blend', description: 'Smooth', origin: 'Kenya', price: '300', image: 'img.jpg' },
            { id: 2, name: 'Robusta Dark', description: 'Bold', origin: 'Uganda', price: '280', image: 'img2.jpg' },
            { id: 3, name: 'Ethiopian Light', description: 'Fruity', origin: 'Ethiopia', price: '350', image: 'img3.jpg' }
        ],
        setProductsData: jest.fn()
    })
}))
 
test('renders a card for every product when search is empty', () => {
    render(<ProductList searchValue={{ text: '', criteria: 'name' }} />)
    expect(screen.getByText('Arabica Blend')).toBeInTheDocument()
    expect(screen.getByText('Robusta Dark')).toBeInTheDocument()
    expect(screen.getByText('Ethiopian Light')).toBeInTheDocument()
})
 
test('filters products by name', () => {
    render(<ProductList searchValue={{ text: 'arabica', criteria: 'name' }} />)
    expect(screen.getByText('Arabica Blend')).toBeInTheDocument()
    expect(screen.queryByText('Robusta Dark')).not.toBeInTheDocument()
})
 
test('filters products by origin', () => {
    render(<ProductList searchValue={{ text: 'kenya', criteria: 'origin' }} />)
    expect(screen.getByText('Arabica Blend')).toBeInTheDocument()
    expect(screen.queryByText('Robusta Dark')).not.toBeInTheDocument()
})
 
test('filters products by price', () => {
    render(<ProductList searchValue={{ text: '280', criteria: 'price' }} />)
    expect(screen.getByText('Robusta Dark')).toBeInTheDocument()
    expect(screen.queryByText('Arabica Blend')).not.toBeInTheDocument()
})
 
test('renders empty list when no products match the search', () => {
    render(<ProductList searchValue={{ text: 'zzz', criteria: 'name' }} />)
    expect(screen.queryByText('Arabica Blend')).not.toBeInTheDocument()
    expect(screen.queryByText('Robusta Dark')).not.toBeInTheDocument()
})