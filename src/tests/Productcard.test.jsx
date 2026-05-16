import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import ProductCard from '../components/ProductCard'
 
const mockNavigate = jest.fn()
 
jest.mock('react-router-dom', () => ({
    useNavigate: () => mockNavigate
}))
 
const mockCoffee = { id: 3, name: 'Arabica Blend', description: 'Smooth and rich', origin: 'Kenya', price: '300', image: 'coffee.jpg' }
 
test('renders the product name, origin, description and price', () => {
    render(<ProductCard coffee={mockCoffee} />)
    expect(screen.getByText('Arabica Blend')).toBeInTheDocument()
    expect(screen.getByText('Kenya')).toBeInTheDocument()
    expect(screen.getByText('Smooth and rich')).toBeInTheDocument()
    expect(screen.getByText('Ksh. 300')).toBeInTheDocument()
})
 
test('renders the product image with the correct alt text', () => {
    render(<ProductCard coffee={mockCoffee} />)
    expect(screen.getByAltText('Arabica Blend')).toBeInTheDocument()
})
 
test('clicking the card navigates to /shop/:id', () => {
    render(<ProductCard coffee={mockCoffee} />)
    fireEvent.click(screen.getByText('Arabica Blend'))
    expect(mockNavigate).toHaveBeenCalledWith('/shop/3')
})