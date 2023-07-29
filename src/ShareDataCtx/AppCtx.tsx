import React, { createContext, useCallback, useEffect, useReducer } from "react";
import { getCountries } from "../Services/ContriesService";
import { SET_DATA, onSetData, onSuccessAction } from "./AppCtxActions";
import countriesEffect from "./reducers/countriesEffect";
import countriesReducer from "./reducers/countriesReducer";
import { CountryInterface, EffectInterface, initCtxInterface } from "../models/models";

const initialCountries = {
  countries: [],
  hasError:false
};

const initialCtx:initCtxInterface = {
  countries: [],
  hasError:false,
  isLoading:false
};

const CountriesContext = createContext<initCtxInterface>(initialCtx);
interface CountryComp{
     children: React.ReactNode
}

const initialInterfaceEffect:EffectInterface = {
    status:0,
    message:'',
    hasError:false,
    countries:[]
}

const CountriesProvider: React.FC<CountryComp> = ({ children }:CountryComp) => {
  const [state, dispatch] = useReducer(countriesReducer, initialCountries);
  const [apiState,dispatchApi] = useReducer(countriesEffect,initialInterfaceEffect);

  const countriesApi = useCallback(async()=>{
        try{
            let countries = await getCountries();
            console.log(countries.data)
            
             const countriesData:CountryInterface[] = countries.data.map((country:any) =>({
                    cca2:country.cca2,
                    flagUrl:country.flags.svg,
                    name:country.name.common,
                    latlog:country.latlng
             }));
    
            
            dispatchApi( onSuccessAction({
                status:200,
                message:'Countries Fetched successfully',
                hasError:false,
                countries:countriesData
            }));

            dispatch(onSetData(countriesData));
        }catch(error){
            console.error(error)
        }
        
  },[])

  useEffect(()=>{
     console.log("apiState ",state);
  },[state])

  useEffect(()=>{
    countriesApi();
  },[])
  return (
    <CountriesContext.Provider value={{ countries:state.countries??[],hasError:apiState.hasError,isLoading:false }}>
      {children}
    </CountriesContext.Provider>
  );
};

export { CountriesContext, CountriesProvider };



