import { Modal, Typography, Box, Grid, TextField, Stack } from '@mui/material';
import { Reservation } from './types';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

interface ReservationModalProps {
  open: boolean;
  onClose: () => void;
  reservation: Reservation;
}

const ReservationModal: React.FC<ReservationModalProps> = ({ reservation, open, onClose }) => {
  if (!reservation) {
    return null;
  }
  const {
    stay,
    room,
    firstName,
    lastName,
    email,
    phone,
    addressStreet,
    addressLocation,
    extras
   } = reservation;

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
        <div style={{ backgroundColor: 'white', padding: '1rem' }}>
          <Typography variant="h5" gutterBottom>
            Reservation Details
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack spacing={0} rowGap={2}>
              <Grid container item spacing={2}>
                <Grid item xs={6}>
                  <DesktopDatePicker
                    label="Arrival Date"
                    inputFormat="MM/DD/YYYY"
                    value={new Date(stay.arrivalDate)}
                    onChange={() => { }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Grid>
                <Grid item xs={6}>
                  <DesktopDatePicker
                    label="Departure Date"
                    inputFormat="MM/DD/YYYY"
                    value={new Date(stay.departureDate)}
                    onChange={() => { }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Grid>
              </Grid>
              <Grid container item spacing={2}>
                <Grid item xs={6}>
                  <TextField label="Room Size" value={room.roomSize} />
                </Grid>
                <Grid item xs={6}>
                  <TextField label="Room Size" value={room.roomQuantity} />
                </Grid>
              </Grid>

              <Grid item xs={6}>
                <TextField label="First Name" value={firstName} />
              </Grid>
              <Grid item xs={6}>
                <TextField label="Last Name" value={lastName} />
              </Grid>
              <Grid item xs={6}>
                <TextField label="Email" value={email} />
              </Grid>
              <Grid item xs={6}>
                <TextField label="Phone" value={phone} />
              </Grid>

              <Grid container item spacing={2}>
                <Grid item xs={6}>
                  <TextField label="Street Name" value={addressStreet.streetName} />
                </Grid>
                <Grid item xs={6}>
                  <TextField label="Street Number" value={addressStreet.streetNumber} />
                </Grid>
              </Grid>

              <Grid container item spacing={2}>
                <Grid item xs={6}>
                  <TextField label="Zip" value={addressLocation?.zipCode} />
                </Grid>
                <Grid item xs={6}>
                  <TextField label="State" value={addressLocation?.state} />
                </Grid>
              </Grid>
              <Grid container item spacing={2}>
                <Grid item xs={6}>
                  <TextField label="City" value={addressLocation?.city} />
                </Grid>
                <Grid item xs={6}>
                  <TextField label="Extras" value={extras} />
                </Grid>
              </Grid>

            </Stack>
          </LocalizationProvider>
        </div>
      </Box>
    </Modal>
  );
};

export default ReservationModal;