import { CoutryState, CountryAction } from "../../models/models";
import { SET_DATA } from "../AppCtxActions";

const countriesReducer = (currentState: CoutryState, action: CountryAction) => {
  const { type, payload } = action;
  
  switch (type) {
    case SET_DATA:
      return {
        ...currentState,
        countries: payload,
      };
    default:
      return currentState;
  }
};

export default countriesReducer;