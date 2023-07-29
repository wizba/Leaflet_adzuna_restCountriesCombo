import {getCountries} from './ContriesService';


// This tells Jest to use a mock function instead of the real one.
jest.mock('./ContriesService');

describe('CountryService', () => {
  it('getCountries should be resolved with correct status', async () => {
    const mockResponse = { status: 200 };

    // Jest replaces the real function with a mock function
     (getCountries as jest.MockedFunction<typeof getCountries>).mockResolvedValue(mockResponse);

    const response = await getCountries();

    // Check if the function returned the mocked response
    expect(response).toEqual(mockResponse);

    // Check if the function was called
    expect(getCountries).toHaveBeenCalled();
  });
});
