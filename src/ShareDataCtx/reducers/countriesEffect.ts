import { EffectInterface, CountriesEffect } from "../../models/models";

const countriesEffect = (currentState:EffectInterface,action:CountriesEffect) =>{
         const {type,payload} = action;

         switch(type){
            case 'ON_SUCCESS':
               return {
                ...currentState,
                ...payload
               }
            case 'ON_FAIL':
                return{
                    ...currentState,
                    ...payload
                }
            default:
             return currentState

         }
}

export default countriesEffect;