import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';

interface FourRadioButtonsProps {
  value: string | undefined;
  onChange?: (newValue: string) => void;
}

const FourRadioButtons: React.FC<FourRadioButtonsProps> = ({ value, onChange }) => {
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(event.target.value);
  };

  return (
    <FormControl component="fieldset">
      <RadioGroup value={value} onChange={handleRadioChange} row>
        <FormControlLabel value="cc" control={<Radio />} label="Credit Card" />
        <FormControlLabel value="paypal" control={<Radio />} label="Paypal" />
        <FormControlLabel value="cash" control={<Radio />} label="Cash" />
        <FormControlLabel value="bitcoin" control={<Radio />} label="Bitcoin" />
      </RadioGroup>
    </FormControl>
  );
};

export default FourRadioButtons;