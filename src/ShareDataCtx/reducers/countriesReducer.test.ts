import countriesReducer from './countriesReducer';
import { CountryInterface, CoutryState, CountryAction } from '../../models/models';
import { SET_DATA } from '../AppCtxActions';

describe('Countries reducer', () => {
  const countries: CountryInterface[] = [
    {
      cca2: 'AS',
      flagUrl: 'https://flagcdn.com/as.svg',
      name: 'American Samoa',
      latlog: [-14.33333333, -170],
    },
    // Add more mock data as needed
  ];

  test('should set countries data when action type is SET_DATA', () => {
    const action: CountryAction = {
      type: SET_DATA,
      payload: countries,
    };

    const initialState: CoutryState = {
      countries: [],
    };

    const expectedState: CoutryState = {
      countries: countries,
    };

    const newState = countriesReducer(initialState, action);

    expect(newState).toEqual(expectedState);
  });

  test('should return the current state for unknown action type', () => {
    const action: CountryAction = {
      type: 'UNKNOWN_ACTION',
      payload: countries,
    };

    const initialState: CoutryState = {
      countries: countries,
    };

    const newState = countriesReducer(initialState, action);

    expect(newState).toEqual(initialState);
  });
});
