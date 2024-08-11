import axios from 'axios';

export const fetchSuggestions = async (name) => {
  const token = localStorage.getItem('token');
  const shopToken = localStorage.getItem('shopToken');

  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/items/suggestions`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Shop-Token': shopToken,
      },
      params: { name },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching suggestions:', error);
    return [];
  }
};
