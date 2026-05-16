import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import AddForm from '../components/AddForm'
 
const mockSetProductsData = jest.fn()
 
jest.mock('../context/ProductsContext', () => ({
    useProducts: () => ({
        productsData: [{ id: 1, name: 'Arabica', description: 'Smooth', origin: 'Kenya', price: '300', image: 'img.jpg' }],
        setProductsData: mockSetProductsData
    })
}))
 
beforeEach(() => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ id: 2, name: 'New', description: 'Desc', origin: 'Kenya', price: '400', image: 'img.jpg' })
        })
    )
})
 
test('renders all four input fields', () => {
    render(<AddForm />)
    expect(screen.getByPlaceholderText('Enter product name')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter product description')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter country of origin')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter product price in Ksh')).toBeInTheDocument()
})
 
test('renders the submit button', () => {
    render(<AddForm />)
    expect(screen.getByText('Add Product')).toBeInTheDocument()
})

test('typing in a field updates its value', () => {
    render(<AddForm />)
    const input = screen.getByPlaceholderText('Enter product name')
    fireEvent.change(input, { target: { value: 'Robusta' } })
    expect(input.value).toBe('Robusta')
})
 
test('does not fire POST when fields are empty', () => {
    render(<AddForm />)
    fireEvent.click(screen.getByText('Add Product'))
    expect(global.fetch).not.toHaveBeenCalled()
})
 
test('fires POST request when all fields are filled', () => {
    render(<AddForm />)
    fireEvent.change(screen.getByPlaceholderText('Enter product name'), { target: { value: 'Robusta' } })
    fireEvent.change(screen.getByPlaceholderText('Enter product description'), { target: { value: 'Bold' } })
    fireEvent.change(screen.getByPlaceholderText('Enter country of origin'), { target: { value: 'Uganda' } })
    fireEvent.change(screen.getByPlaceholderText('Enter product price in Ksh'), { target: { value: '400' } })
    fireEvent.click(screen.getByText('Add Product'))
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3001/coffee', expect.objectContaining({ method: 'POST' }))
})
 
test('fields reset to empty after successful submit', async () => {
    render(<AddForm />)
    const nameInput = screen.getByPlaceholderText('Enter product name')
    fireEvent.change(nameInput, { target: { value: 'Robusta' } })
    fireEvent.change(screen.getByPlaceholderText('Enter product description'), { target: { value: 'Bold' } })
    fireEvent.change(screen.getByPlaceholderText('Enter country of origin'), { target: { value: 'Uganda' } })
    fireEvent.change(screen.getByPlaceholderText('Enter product price in Ksh'), { target: { value: '400' } })
    fireEvent.click(screen.getByText('Add Product'))
    await waitFor(() => {
        expect(nameInput.value).toBe('')
    })
})