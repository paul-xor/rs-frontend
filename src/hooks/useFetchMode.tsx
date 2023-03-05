import { useState, useEffect } from 'react'
import { ReservationApi } from '../components/types';
import axios from 'axios'

export type UseFetchModReturn = [
  {
    loading: boolean;
    response: null | ReservationApi[];
    error: null | Error
  },
  (url: string, options?: {}) => void
];

const useFetchMod = (): UseFetchModReturn => {
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState(null)
  const [error, setError] = useState(null)
  const [options, setOptions] = useState({})
  const [url, setUrl] = useState('');

  const doQuery = (url: string, options = {}) => {
    setUrl(url)
    setOptions(options)
    setLoading(true)
  }

  useEffect(() => {
    if (!loading) {
      return
    }

    axios(url, options)
      .then(res => {
        setResponse(res.data.body)
        setLoading(false)
      })
      .catch(error => {
        setError(error.response.data)
        setLoading(false)
      })
  }, [loading, options, url])

  return [{ loading, response, error }, doQuery]
}

export default useFetchMod