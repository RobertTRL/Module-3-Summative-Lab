import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import SearchBar from '../components/SearchBar'
 
const mockSetSearchValue = jest.fn()
const defaultSearchValue = { text: '', criteria: 'name' }
 
test('renders the search input', () => {
    render(<SearchBar searchValue={defaultSearchValue} setSearchValue={mockSetSearchValue} />)
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument()
})
 
test('renders the filter dropdown', () => {
    render(<SearchBar searchValue={defaultSearchValue} setSearchValue={mockSetSearchValue} />)
    expect(screen.getByRole('combobox')).toBeInTheDocument()
})
 
test('dropdown has Name, Country of origin, and Price options', () => {
    render(<SearchBar searchValue={defaultSearchValue} setSearchValue={mockSetSearchValue} />)
    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Country of origin')).toBeInTheDocument()
    expect(screen.getByText('Price')).toBeInTheDocument()
})
 
test('typing in search input calls setSearchValue with updated text', () => {
    render(<SearchBar searchValue={defaultSearchValue} setSearchValue={mockSetSearchValue} />)
    fireEvent.change(screen.getByPlaceholderText('Search...'), { target: { value: 'Kenya' } })
    expect(mockSetSearchValue).toHaveBeenCalledWith({ text: 'Kenya', criteria: 'name' })
})
 
test('changing the dropdown calls setSearchValue with updated criteria', () => {
    render(<SearchBar searchValue={defaultSearchValue} setSearchValue={mockSetSearchValue} />)
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'origin' } })
    expect(mockSetSearchValue).toHaveBeenCalledWith({ text: '', criteria: 'origin' })
})