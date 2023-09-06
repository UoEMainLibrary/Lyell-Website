import { useState, useEffect } from 'react';
import { fetchData } from './ApiCall';

export function useSearch() {
  const [searchData, setSearchData] = useState({
    results: [],
    amount: 0,
    tags: []
  });

  const fetchDataFromAPI = async (query) => {
    const data = await fetchData("search?" + query);
    setSearchData(data);
  };

  return { searchData, fetchDataFromAPI };
}