import { SET_DATA } from "../ShareDataCtx/AppCtxActions";

// Define interfaces
export interface CountryInterface {
  cca2: string;
  flagUrl: string;
  name: string;
  latlog: [number, number];
}

export interface CoutryState {
  countries?: CountryInterface[];
}

// An interface for our actions
export interface CountryAction {
  type: string;
  payload: CountryInterface[];
}

export interface initCtxInterface{
    countries:CountryInterface[],
    hasError:boolean,
    isLoading:boolean
}

// effect for API side effects
export interface EffectInterface{
    countries?:Array<CountryInterface>;
    status:number;
    message:string;
    hasError:boolean
}

export interface CountriesEffect{
    type:string;
    payload:EffectInterface
}