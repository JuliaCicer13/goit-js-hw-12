import axios from 'axios';

const baseURL = 'https://pixabay.com/api/';

const MY_API_KEY = '48269071-e04b626909c4b310c40a55ae0';

export async function fetchImages (searchValue, page = 1) 
    {
   try {
    const response = await
      axios.get(baseURL, {

      params: {
        key: MY_API_KEY,
        q: searchValue,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: page,
        per_page: 20,
       
        },

    }   
  );

    return response.data;

   }   
     catch (error) {
    console.error('Error fetching images:', error.message);
     throw error;

   }
  
}; 
    