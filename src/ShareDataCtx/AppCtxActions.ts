import { EffectInterface, CountriesEffect, CountryInterface, CountryAction } from "../models/models";

export const ON_SUCCESS = 'ON_SUCCESS';
export const ON_FAIL = 'ON_FAIL';
export const SET_DATA = 'SET_DATA';

export const onSuccessAction = (payload:EffectInterface):CountriesEffect =>({
    type:ON_SUCCESS,
    payload
});

export const onSetData = (countriesData: CountryInterface[]): CountryAction =>({type:SET_DATA,payload:countriesData});