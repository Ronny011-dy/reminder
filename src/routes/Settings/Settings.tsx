import { FormControlLabel, FormGroup } from '@mui/material';
import { Root, MaterialUISwitch } from './Settings.styles';
import { useState } from 'react';

type SettingsProps = {};

const Settings: React.FC<SettingsProps> = () => {
  const [themeModeLabel, setThemeModeLabel] = useState('Dark mode');
  const [checked, setChecked] = useState(true);
  const toggleHandler = () => {
    setChecked((prev) => !prev);
    setThemeModeLabel(!checked ? 'Dark mode' : 'Light mode');
  };
  return (
    <Root>
      <h2>Application Settings</h2>
      <FormGroup>
        <FormControlLabel
          control={
            <MaterialUISwitch
              sx={{ m: 1 }}
              onChange={toggleHandler}
              checked={checked}
            />
          }
          label={themeModeLabel}
        />
      </FormGroup>
    </Root>
  );
};

export { Settings };
