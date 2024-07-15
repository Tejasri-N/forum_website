import React, { useState } from 'react'

const SearchBar = ({ placeholder, onSearch }) => {
    const [query, setQuery] = useState('');

    const handleChange = (event) => {
        setQuery(event.target.value);
        onSearch(event.target.value);
    }

    return (
        <div className='search-bar '>
            <input
                className='w-[30vw] h-10 flex p-2'
                type="text"
                placeholder={placeholder || 'Type here to Search'} // Set default placeholder
                value={query}
                onChange={handleChange}
            />
        </div>
    );
}

export default SearchBar