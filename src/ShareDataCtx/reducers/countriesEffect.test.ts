import React from 'react';
import countriesEffect from './countriesEffect';
import { CountriesEffect, CountryInterface, EffectInterface } from '../../models/models';
import { ON_FAIL, ON_SUCCESS, SET_DATA } from '../AppCtxActions';

describe('Countries reducer', () => {
    const  countries:CountryInterface[]=[ {
                        cca2: "AS",
                        flagUrl: "https://flagcdn.com/as.svg",
                        name: "American Samoa",
                        latlog: [
                        -14.33333333,
                        -170
                    ]
            }];

    test('When you call on ON_SUCCESS it should return correct data', () => {
        const actualResults: EffectInterface = {
            countries: countries,
            status: 200,
            message: 'Fetch countries successful',
            hasError: false
        };

        const action: CountriesEffect = {
            type: ON_SUCCESS,
            payload: {
                countries: countries,
                status: 200,
                message: 'Fetch countries successful',
                hasError: false
            }
        }

        const initialState: EffectInterface = {
            status: 200,
            message: 'Fetch countries successful',
            hasError: false,
            countries: []
        }

        let reducer = countriesEffect(initialState, action);

        expect(reducer).toStrictEqual(actualResults)
    })

    test('When you call ON_FAILURE it should return correct data', () => {
    const actualResults: EffectInterface = {
      countries: [],
      status: 404,
      message: 'Countries not found',
      hasError: true,
    };

    const action: CountriesEffect = {
      type: ON_FAIL,
      payload: {
        countries: [],
        status: 404,
        message: 'Countries not found',
        hasError: true,
      },
    };

    const initialState: EffectInterface = {
      status: 200,
      message: 'Fetch countries successful',
      hasError: false,
      countries: [],
    };

    const reducer = countriesEffect(initialState, action);

    expect(reducer).toEqual(actualResults);
  });

})