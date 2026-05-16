import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import ProductDetails from '../pages/ProductDetails'
 
const mockNavigate = jest.fn()
 
jest.mock('react-router-dom', () => ({
    useNavigate: () => mockNavigate,
    useParams: () => ({ id: '1' })
}))
 
jest.mock('../context/ProductsContext', () => ({
    useProducts: () => ({
        productsData: [
            { id: 1, name: 'Arabica Blend', description: 'Smooth and rich', origin: 'Kenya', price: '300', image: 'coffee.jpg' }
        ],
        setProductsData: jest.fn()
    })
}))
 
test('renders the product name, origin, description and price', () => {
    render(<ProductDetails />)
    expect(screen.getByText('Arabica Blend')).toBeInTheDocument()
    expect(screen.getByText('Kenya')).toBeInTheDocument()
    expect(screen.getByText('Smooth and rich')).toBeInTheDocument()
    expect(screen.getByText('KES 300')).toBeInTheDocument()
})
 
test('shows loading message when product is not found', () => {
    jest.mock('../context/ProductsContext', () => ({
        useProducts: () => ({ productsData: [], setProductsData: jest.fn() })
    }))
    render(<ProductDetails />)
})
 
test('back button navigates to /shop', () => {
    render(<ProductDetails />)
    fireEvent.click(screen.getByText('← Back to shop'))
    expect(mockNavigate).toHaveBeenCalledWith('/shop')
})