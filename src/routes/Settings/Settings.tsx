import { useContext } from 'react';
import { FormControlLabel, FormGroup, Checkbox, useTheme } from '@mui/material';
import { ColorModeContext } from '../../components/Theme/Theme';
import { Root, StyledDiv, MaterialUISwitch } from './Settings.styles';

const Settings: React.FC = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const overriden = colorMode?.getOverrideStatus();
  const handleOnCheck = () => {
    colorMode?.toggleOverride();
  };
  const toggleHandler = () => {
    colorMode?.toggleColorMode();
  };
  return (
    <Root>
      <StyledDiv theme={theme}>
        <h2>Application Settings</h2>
        <hr />
        <h3>Theme</h3>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={overriden} onClick={handleOnCheck} />}
            label={'Override OS preference'}
          />
          <FormControlLabel
            disabled={!overriden}
            control={
              <MaterialUISwitch
                sx={{ m: 1 }}
                onChange={toggleHandler}
                checked={
                  colorMode?.getThemePreference() === 'dark' ? true : false
                }
              />
            }
            label={`${
              colorMode?.getThemePreference() === 'dark' ? 'Dark' : 'Light'
            } mode`}
          />
        </FormGroup>
      </StyledDiv>
    </Root>
  );
};

export { Settings };
