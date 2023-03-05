import { Modal, Typography, Box, Grid, TextField, Stack, Chip, Switch } from '@mui/material';
import { ReservationApi } from './types';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import FourRadioButtons from './FourRadioButtons';

interface ReservationModalProps {
  open: boolean;
  onClose: () => void;
  reservation: ReservationApi;
}

const ReservationModal: React.FC<ReservationModalProps> = ({ reservation, open, onClose }) => {
  if (!reservation) {
    return null;
  }
  const {
    // id,
    arrival_date,
    departure_date,
    room_size,
    room_quantity,
    first_name,
    last_name,
    email,
    phone,
    street_name,
    street_number,
    zip_code,
    state,
    city,
    extras,
    payment,
    note,
    tags,
    reminder,
    newsletter,
    // confirm,
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
                    value={new Date(arrival_date)}
                    onChange={() => { }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Grid>
                <Grid item xs={6}>
                  <DesktopDatePicker
                    label="Departure Date"
                    inputFormat="MM/DD/YYYY"
                    value={new Date(departure_date)}
                    onChange={() => { }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Grid>
              </Grid>
              <Grid container item spacing={2}>
                <Grid item xs={6}>
                  <TextField label="Room Size" value={room_size} />
                </Grid>
                <Grid item xs={6}>
                  <TextField label="Room Size" value={room_quantity} />
                </Grid>
              </Grid>

              <Grid container item spacing={2}>
                <Grid item xs={6}>
                  <TextField label="First Name" value={first_name} />
                </Grid>
                <Grid item xs={6}>
                  <TextField label="Last Name" value={last_name} />
                </Grid>
              </Grid>

              <Grid container item spacing={2}>
                <Grid item xs={6}>
                  <TextField label="Email" value={email} />
                </Grid>
                <Grid item xs={6}>
                  <TextField label="Phone" value={phone} />
                </Grid>
              </Grid>

              <Grid container item spacing={2}>
                <Grid item xs={6}>
                  <TextField label="Street Name" value={street_name} />
                </Grid>
                <Grid item xs={6}>
                  <TextField label="Street Number" value={street_number} />
                </Grid>
              </Grid>

              <Grid container item spacing={2}>
                <Grid item xs={6}>
                  <TextField label="Zip" value={zip_code} />
                </Grid>
                <Grid item xs={6}>
                  <TextField label="State" value={state} />
                </Grid>
              </Grid>
              <Grid container item spacing={2}>
                <Grid item xs={6}>
                  <TextField label="City" value={city} />
                </Grid>
                <Grid item xs={6}>
                  <TextField label="Extras" value={extras} />
                </Grid>
              </Grid>
              <FourRadioButtons value={payment} />
              <Grid item xs={6}>
                <TextField label="Personal Note" value={note} />
              </Grid>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', '& > *': { my: 0.5 } }}>
                {tags?.map((tag) => (
                  <Chip key={tag} label={tag} />
                ))}
              </Box>
              <Grid container item spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body1">Send me a reminder</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Switch checked={reminder} />
                </Grid>
              </Grid>
              <Grid container item spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body1">Subscribe to newsletter</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Switch checked={newsletter} />
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