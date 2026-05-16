import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import DeleteSection from '../components/DeleteSection'
 
const mockProducts = [
    { id: 1, name: 'Arabica', description: 'Smooth', origin: 'Kenya', price: '300', image: 'img.jpg' },
    { id: 2, name: 'Robusta', description: 'Bold', origin: 'Uganda', price: '280', image: 'img2.jpg' }
]
 
const mockSetProductsData = jest.fn()
 
jest.mock('../context/ProductsContext', () => ({
    useProducts: () => ({
        productsData: mockProducts,
        setProductsData: mockSetProductsData
    })
}))
 
beforeEach(() => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
            ok: true,
            json: () => Promise.resolve({})
        })
    )
})
 
test('renders the product select dropdown with all products', () => {
    render(<DeleteSection />)
    expect(screen.getByText('Arabica')).toBeInTheDocument()
    expect(screen.getByText('Robusta')).toBeInTheDocument()
})
 
test('fires DELETE request to the correct endpoint', () => {
    render(<DeleteSection />)
    fireEvent.click(screen.getByText('Delete Product'))
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3001/coffee/1', expect.objectContaining({ method: 'DELETE' }))
})
 
test('removes deleted product from the list', async () => {
    render(<DeleteSection />)
    fireEvent.click(screen.getByText('Delete Product'))
    await waitFor(() => {
        expect(mockSetProductsData).toHaveBeenCalled()
    })
})