import React, { useState } from 'react';
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
import { Reservation } from './types';
import data from '../data/reservations.json';
import ReservationModal from './ReservationModal';

const SearchReservation: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Reservation[]>([]);
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [open, setOpen] = useState(false)
  const reservations = data;

  const handleSearch = () => {
    const results = reservations.filter(
      (reservation) =>
        reservation.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reservation.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reservation.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reservation.phone.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  };

  const handleClear = () => {
    setSearchTerm('');
    setSearchResults([]);
  }

  const handleRowClick = (reservation: Reservation | null) => {
    setSelectedReservation(reservation);
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <div>
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
                <TableCell>{reservation.firstName}</TableCell>
                <TableCell>{reservation.lastName}</TableCell>
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