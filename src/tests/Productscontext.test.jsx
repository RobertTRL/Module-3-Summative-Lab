import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ProductsProvider, useProducts } from '../context/ProductsContext'
 
const mockProducts = [
    { id: 1, name: 'Arabica Blend', description: 'Smooth', origin: 'Kenya', price: '300', image: 'img.jpg' }
]
 
function TestComponent() {
    const { productsData } = useProducts()
    return <div>{productsData.map(p => <span key={p.id}>{p.name}</span>)}</div>
}
 
beforeEach(() => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
            ok: true,
            json: () => Promise.resolve(mockProducts)
        })
    )
})
 
test('productsData starts as an empty array before fetch resolves', () => {
    global.fetch = jest.fn(() => new Promise(() => {}))
    render(<ProductsProvider><TestComponent /></ProductsProvider>)
    expect(screen.queryByText('Arabica Blend')).not.toBeInTheDocument()
})
 
test('fires a GET request on mount', () => {
    render(<ProductsProvider><TestComponent /></ProductsProvider>)
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3001/coffee')
})
 
test('productsData is populated after fetch resolves', async () => {
    render(<ProductsProvider><TestComponent /></ProductsProvider>)
    await waitFor(() => {
        expect(screen.getByText('Arabica Blend')).toBeInTheDocument()
    })
})