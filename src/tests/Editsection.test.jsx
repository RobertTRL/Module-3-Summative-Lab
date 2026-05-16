import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import EditSection from '../components/EditSection'
 
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
            json: () => Promise.resolve({ id: 1, name: 'Updated', description: 'Smooth', origin: 'Kenya', price: '350', image: 'img.jpg' })
        })
    )
})
 
test('renders the product select dropdown', () => {
    render(<EditSection />)
    expect(screen.getByText('Arabica')).toBeInTheDocument()
    expect(screen.getByText('Robusta')).toBeInTheDocument()
})
 
test('selecting a product populates the inputs with that products data', () => {
    render(<EditSection />)
    fireEvent.change(screen.getByRole('combobox', { name: /select coffee/i }), { target: { value: '2' } })
    expect(screen.getByRole('textbox', { name: /Name/i })).toHaveValue('Robusta');
    expect(screen.getByDisplayValue('Uganda')).toBeInTheDocument()
})
 
test('submit button is disabled when nothing has changed', () => {
    render(<EditSection />)
    expect(screen.getByText('Edit Product')).toBeDisabled()
})
 
test('submit button is enabled after a field is changed', () => {
    render(<EditSection />)
    const nameInput = screen.getByRole('textbox', { name: /Name/i })
    fireEvent.change(nameInput, { target: { value: 'New Name' } })
    expect(screen.getByText('Edit Product')).not.toBeDisabled()
})
 
test('typing in a field updates its displayed value', () => {
    render(<EditSection />)
    const nameInput = screen.getByRole('textbox', { name: /Name/i });
    fireEvent.change(nameInput, { target: { value: 'Espresso' } });
    expect(nameInput.value).toBe('Espresso')
})
 