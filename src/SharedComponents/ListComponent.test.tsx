import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // For extending Jest expect

// Import the component to be tested
import ListComponent from './ListComponent';
import { CountriesContext } from '../ShareDataCtx/AppCtx';
import { initCtxInterface } from '../models/models';

// Mock the getCountries function
jest.mock('../Services/ContriesService.ts', () => ({
  getCountries: jest.fn(() => Promise.resolve({
    data: [
      { cca2: 'US', flagUrl: 'us.svg', name: 'United States', latlog: [37.09024, -95.712891] },
      { cca2: 'CA', flagUrl: 'ca.svg', name: 'Canada', latlog: [56.130366, -106.346771] },
      // Add more mock data as needed
    ]
  }))
}));
// Test the ListComponent component
describe('ListComponent', () => {
  test('should render list items with the provided context value', () => {
    // Mock the context value to be used by ListComponent
    const mockContextValue:initCtxInterface = {
      countries: [
        { cca2: 'US', flagUrl: 'us.svg', name: 'United States', latlog: [37.09024, -95.712891] },
        { cca2: 'CA', flagUrl: 'ca.svg', name: 'Canada', latlog: [56.130366, -106.346771] },
        // Add more mock data as needed
      ],
      isLoading:false,
      hasError:false
    };

    // Render the ListComponent inside the CountriesProvider with the mock context value
    const { getByText } = render(
      <CountriesContext.Provider value={mockContextValue}>
        <ListComponent />
      </CountriesContext.Provider>
    );

    // Assert that list items are rendered based on the mock data
    expect(getByText('United States')).toBeInTheDocument();
    expect(getByText('Canada')).toBeInTheDocument();
    // Add more assertions for other list items as needed
  });

  test('should render no items if countries array is empty', () => {
    // Mock the context value with an empty countries array
    const mockContextValue = {
      countries: [],
      isLoading:false,
      hasError:false
    };

    // Render the ListComponent inside the CountriesProvider with the mock context value
    const { container } = render(
      <CountriesContext.Provider value={mockContextValue}>
        <ListComponent />
      </CountriesContext.Provider>
    );

    // Assert that the list container is rendered
    expect(container.querySelector('.mt-5')).toBeInTheDocument();

    // Assert that there are no list items rendered
    expect(container.querySelectorAll('.list-item')).toHaveLength(0);
  });
});

