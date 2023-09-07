import { useState, useEffect } from 'react';
import { fetchData } from './ApiCall';

export function useObject(id) {
  const [customData, setCustomData] = useState(null);

  useEffect(() => {
    const fetchObjData = async () => {
      try {
        const response = await fetchData(`object/${id}`);

        // Modify the response as needed
        const modifiedData = {
          ...response,
          // Add or modify properties here
        };

        setCustomData(modifiedData);
      } catch (error) {
        // Handle any errors from the API call
        console.error('Error fetching data:', error);
      }
    };

    fetchObjData();
  }, [id]);

  return customData;
}
