import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import AddForm from '../components/AddForm'
import { ProductsContext } from '../context/ProductsContext'

test('renders inputs and updates value on typing', () => {
    const mockContextValue = {
        productsData: [],
        setProductsData: jest.fn()
    }

    render(
        <ProductsContext.Provider value={mockContextValue}>
            <AddForm />
        </ProductsContext.Provider>
    )
    
    const nameInput = screen.getByPlaceholderText('Enter product name')
    expect(nameInput).toBeInTheDocument()
    fireEvent.change(nameInput, { target: { value: 'Mocha' } })
    expect(nameInput.value).toBe('Mocha')
})