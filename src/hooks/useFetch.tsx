import { useState, useEffect } from 'react'
import { ReservationApi } from '../components/types';
import axios from 'axios'

export type UseFetchReturn = [
  {
    isLoading: boolean;
    response: null | ReservationApi[];
    error: null | Error
  },
  (options?: {}) => void
];

const useFetch = (url: string):UseFetchReturn => {
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState(null)
  const [error, setError] = useState(null)
  const [options, setOptions] = useState({})

  const doFetch = (options = {}) => {
    setOptions(options)
    setIsLoading(true)
  }

  useEffect(() => {
    if (!isLoading) {
      return
    }

    axios(url, options)
      .then(res => {
        setResponse(res.data)
        setIsLoading(false)
      })
      .catch(error => {
        setError(error.response.data)
        setIsLoading(false)
      })
  }, [isLoading, options, url])

  return [{ isLoading, response, error }, doFetch]
}

export default useFetch