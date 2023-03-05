import React, { useState, useEffect } from 'react';
import useFetch, { UseFetchReturn } from '../hooks/useFetch';

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
// import dataHardCoded from '../data/reservations.json';
import ReservationModal from './ReservationModal';

const API_URL_READ = 'https://2wrdmmy1m7.execute-api.us-east-1.amazonaws.com/prod/read'

const SearchReservation: React.FC = () => {
  const [data, setData] = useState<ReservationApi[]| null>([]);
  const [init, setInit] = useState<boolean>(true);
  const [loading, setLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<ReservationApi[]>([]);
  const [selectedReservation, setSelectedReservation] = useState<ReservationApi | null>(null);
  const [open, setOpen] = useState(false)
  const [{ response, isLoading, error }, doFetch]: UseFetchReturn = useFetch(API_URL_READ);

  useEffect (() => {
    if(init) {
      console.log('!! doFetch !!')
      setInit(false);
      doFetch();
    }
  }, [doFetch, init]);

  useEffect (() => {
    if(response && !isLoading) {
      setData(response)
      setSearchResults(response)
    }
  }, [response, isLoading])

  useEffect(() => {
    // console.log('## searchTerm', searchTerm)
  }, [searchTerm])

  console.log('## hook:', response, isLoading, error);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return null;
  }

  const handleSearch = () => {
    const results = data.filter(
      (reservation) =>
        reservation.first_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  };

  const handleClear = () => {
    setSearchTerm('');
    setSearchResults([]);
  }

  const handleRowClick = (reservation: ReservationApi | null) => {
    setSelectedReservation(reservation);
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
        <TextField
          label="Search"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button variant="contained" onClick={handleSearch}>
          Search
        </Button>
        <Button variant="contained" onClick={handleClear}>
          Clear
        </Button>
      </div>

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
            {searchResults.map((reservation, index) => (
              <TableRow key={index} onClick={() => handleRowClick(reservation)}>
                <TableCell>{reservation.first_name}</TableCell>
                <TableCell>{reservation.last_name}</TableCell>
                <TableCell>{reservation.email}</TableCell>
                <TableCell>{reservation.phone}</TableCell>
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