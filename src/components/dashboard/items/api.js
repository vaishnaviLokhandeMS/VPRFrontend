const API_URL = '/api/items';

// Function to add a new item
export const addItem = async (itemData) => {
  const response = await fetch(`${API_URL}/add`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Shop-Token': shopToken,
      },
    body: JSON.stringify(itemData)
  });
  return response.json();
};

// Function to get all items
export const getAllItems = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

// Function to get an item by ID
export const getItemById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  return response.json();
};

// Function to update an item by ID
export const updateItemById = async (id, itemData) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(itemData)
  });
  return response.json();
};

// Function to delete an item by ID
export const deleteItemById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  });
  return response.json();
};
