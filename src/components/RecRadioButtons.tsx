import { FormControl, FormControlLabel, Radio, RadioGroup, Grid } from '@mui/material';

interface FourRadioButtonsProps {
  value: string | undefined;
  onChange?: (newValue: string) => void;
}

const RecRadioButtons: React.FC<FourRadioButtonsProps> = ({ value, onChange }) => {
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(event.target.value);
  };

  return (
    <FormControl component="fieldset">
      <RadioGroup value={value} onChange={handleRadioChange}>
        <Grid container spacing={2}>
          <Grid item xs={6} sm={3}>
            <FormControlLabel value="first_name" control={<Radio />} label="First Name" />
          </Grid>
          <Grid item xs={6} sm={3}>
            <FormControlLabel value="last_name" control={<Radio />} label="Last Name" />
          </Grid>
          <Grid item xs={6} sm={3}>
            <FormControlLabel value="email" control={<Radio />} label="Email" />
          </Grid>
          <Grid item xs={6} sm={3}>
            <FormControlLabel value="city" control={<Radio />} label="City" />
          </Grid>
        </Grid>
      </RadioGroup>
    </FormControl>
  );
};

export default RecRadioButtons;
