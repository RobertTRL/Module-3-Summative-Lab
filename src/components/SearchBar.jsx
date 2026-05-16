import { useId } from "react"

export default function SearchBar({ searchValue, setSearchValue }) {
    const selectid = useId()
    return ( 
        <div className="search-bar">
            <input type="search" name="search" value={searchValue.text} onChange={(e) => setSearchValue({...searchValue, text: e.target.value})} className="search-input"/>
            <label htmlFor={selectid}>Filter by: </label>
            <select name="select" value={searchValue.criteria} onChange={(e) => setSearchValue({...searchValue, criteria: e.target.value})} id={selectid}>
                <option value="name">Name</option>
                <option value="origin">Country of origin</option>
                <option value="price">Price</option>
            </select>
        </div>
    )
}