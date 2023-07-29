import axios from "axios";

export const getCountries = async ():Promise<any> =>{
    try{
        const response = await axios.get('https://restcountries.com/v3.1/all?fields=name,flags,cca2,latlng');
        console.log(response);
        return response;
    } catch (error) {
    // Handle any errors that might occur during the API request.
    console.error('Error fetching country data:', error);
    throw error;
  }
    
}

