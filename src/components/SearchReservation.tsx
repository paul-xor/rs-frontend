import React, { useState, useEffect } from 'react';
import useFetch, { UseFetchReturn } from '../hooks/useFetch';
import useFetchMode, { UseFetchModReturn } from '../hooks/useFetchMode';
import { BehaviorSubject, debounceTime, distinctUntilChanged, filter, from, mergeMap } from 'rxjs';

import {
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { ReservationApi } from './types';
import ReservationModal from './ReservationModal';
import RecRadioButtons from './RecRadioButtons';

const API_URL_READ = 'https://2wrdmmy1m7.execute-api.us-east-1.amazonaws.com/prod/read'
const API_URL_SEARCH = 'https://33ye23ukr3.execute-api.us-east-1.amazonaws.com/prod/search/'

const getSearchByCreteria = async (search: string, criteria: string) => {
  const { body: reservations } = await fetch(
    `${API_URL_SEARCH}?search=${search}&criteria=${criteria}`
    )
    .then(res => res.json())
  console.log('### reservations: ', reservations)
  return reservations;
}

let searchSubject = new BehaviorSubject('');

const useObservable = (observable: any, setter: any) => {
  useEffect(() => {
    let subscription = observable.subscribe((result: any) => {
      setter(result)
    });
    return () => subscription.unsubscribe()
  }, [observable, setter])
}

const SearchReservation: React.FC = () => {
  const [data, setData] = useState<ReservationApi[] | null>([]);
  const [init, setInit] = useState<boolean>(true);
  const [criteria, setCriteria] = useState('firstName');

  const [search, setSearch] = useState<string>('');

  let searchResultObservable = searchSubject.pipe(
    filter(val => val.length > 1),
    debounceTime(700),
    distinctUntilChanged(),
    mergeMap(val => from(getSearchByCreteria(val, criteria)))
  )

  useObservable(searchResultObservable, setData);

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedReservation, setSelectedReservation] = useState<ReservationApi | null>(null);
  const [open, setOpen] = useState(false)
  const [{ response, isLoading, error }, doFetch]: UseFetchReturn = useFetch(API_URL_READ);
  const [{ response: resp, loading, error: err }, doQuery]: UseFetchModReturn = useFetchMode();

  useEffect(() => {
    if (init) {
      setInit(false);
      doFetch();
    }
  }, [doFetch, init]);

  useEffect(() => {
    if (response && !isLoading) {
      setData(response)
    }
    if (resp) {
      setData(resp)
    }
  }, [response, isLoading, resp])

  if (isLoading || loading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return null;
  }

  const handleCriteriaChange = (newValue: string) => {
    setCriteria(newValue);
  };

  const handleSearch = () => {
    console.log(`${API_URL_SEARCH}?search=${searchTerm}&criteria=${criteria}`)
    doQuery(`${API_URL_SEARCH}?search=${searchTerm}&criteria=${criteria}`)
  };

  const handleClear = () => {
    setSearchTerm('');
    setData([]);
  }

  const handleRowClick = (reservation: ReservationApi | null) => {
    setSelectedReservation(reservation);
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    searchSubject.next(newValue);
    setSearch(newValue);

  }
  console.log('##: search: ', search);

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
        <TextField
          label="Search"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <RecRadioButtons value={criteria} onChange={handleCriteriaChange} />
        <Button variant="contained" onClick={handleSearch} disabled={!searchTerm}>
          Search
        </Button>
        <Button variant="contained" onClick={handleClear}>
          Clear
        </Button>
        <TextField
          label="SearchRxJS"
          variant="outlined"
          value={search}
          onChange={handleSearchChange}
        />
      </div>

      {error && <h2>Can't fetch data</h2>}
      {err && <h2>Can't search data</h2>}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((reservation, index) => (
              <TableRow key={index} onClick={() => handleRowClick(reservation)}>
                <TableCell>{reservation.first_name}</TableCell>
                <TableCell>{reservation.last_name}</TableCell>
                <TableCell>{reservation.email}</TableCell>
                <TableCell>{reservation.phone}</TableCell>
                <TableCell>{reservation.city}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {selectedReservation && (
        <ReservationModal open={open} onClose={handleClose} reservation={selectedReservation} />
      )}
    </div>
  );
};

export default SearchReservation;