import { useContext } from "react";
import ListItem from "./ListItem";
import { CountriesContext } from "../ShareDataCtx/AppCtx";
import { CountryInterface } from "../models/models";

const ListComponent = () =>{
    const { countries } = useContext(CountriesContext)

    return (<div className="mt-5 overflow-y-auto">
        {(countries && countries?.length> 0) && countries.map((item:CountryInterface)=><ListItem item={item} key={item.cca2}/>)}
    </div>)
}

export default ListComponent;