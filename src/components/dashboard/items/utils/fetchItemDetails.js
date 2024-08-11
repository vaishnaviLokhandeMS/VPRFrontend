import axios from 'axios';

export const fetchItemDetails = async (itemName, setFormData) => {
  try {
    const token = localStorage.getItem('token');
    const shopToken = localStorage.getItem('shopToken');

    const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/items/viewItem`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Shop-Token': shopToken,
      },
      params: { itemName },
    });

    setFormData(response.data); // Populate form with fetched item details
  } catch (error) {
    console.error('Error fetching item details:', error);
    alert('Failed to fetch item details.');
  }
};
