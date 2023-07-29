import { useCallback, useEffect } from "react";
import { getCountries } from "../../Services/ContriesService";
import ListComponent from "../../SharedComponents/ListComponent"
import SearchInput from "../../SharedComponents/SearchInput"
import './JobCountries.css';
const JobCountries = () =>{
        
    return (<div className="CountriesContainer p-5 overflow-y-auto" >
        <SearchInput searchedCountry={''}/>
        <ListComponent/>
    </div>)
}

export default JobCountries;
