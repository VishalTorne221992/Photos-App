import axios from 'axios';
import React, { useEffect, useState } from 'react'

const useFetchPhotos = (url) => {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)

  
    useEffect(() => {

        const controller = new AbortController();
        
          function fetchPhotos(){
              setLoading(true);
              axios.get(url, { signal: controller.signal })
                .then((response) => {
                    setData(response.data);
                    setError(null);
                })
                .catch((err) => {
                    if (err.name === 'AbortError') return; // Ignore canceled requests
                    setError(err);
                })
                .finally(() => {
                    setLoading(false);
                });

          }
  
          fetchPhotos();

          return () => controller.abort();
      },[url])
     

  return { loading, error, data }
}

export default useFetchPhotos