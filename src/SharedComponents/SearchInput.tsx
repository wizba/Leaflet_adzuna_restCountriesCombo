interface SearchInterface{
    searchedCountry:string
}

const SearchInput = (props:SearchInterface) =>{
    return <div>
        <input type="text" name="price" id="price" className="block w-full rounded-md border-0 py-1 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="0.00"></input>
    </div>
}

export default SearchInput;