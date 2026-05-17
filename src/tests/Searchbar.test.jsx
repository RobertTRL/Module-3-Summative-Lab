import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import SearchBar from '../components/SearchBar'
 
test('renders search input and dropdown options', () => {
    render(<SearchBar searchValue={{text: '', criteria: ''}} setSearchValue={() => {}} />)
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument()
    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Country of origin')).toBeInTheDocument()
    expect(screen.getByText('Price')).toBeInTheDocument()
})
