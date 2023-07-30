import axios from "axios";
const environment = {
  production: false,
  JOBS_API_URL:'https://api.adzuna.com/v1/api/jobs/',
  API_KEY:'68f228bafc2a70d8ad12f01e0011657f',
  JOBS_APP_ID:'f89967e0'
};
// Define a function to fetch jobs data for a given country (based on cca2 code)
export const getJobs = async (cca2: string): Promise<any> => {
  try {
    // Make an API request to fetch jobs data from the specified URL using axios
    const response = await axios.get(
      `${environment.JOBS_API_URL}${cca2.toLowerCase()}/search/1?app_id=${environment.JOBS_APP_ID}&app_key=${environment.API_KEY}`
    );

    // Log the response to the console for debugging purposes
    console.log(response);

    // Return the API response data
    return response;
  } catch (error) {
    // If an error occurs during the API request, handle the error gracefully
    // Log the error to the console for debugging purposes
    console.error('Error fetching country data:', error);

    // Rethrow the error to propagate it to the caller or any other error handling mechanisms
    throw error;
  }
};

