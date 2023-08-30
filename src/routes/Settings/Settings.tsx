import { useContext } from 'react';
import { FormControlLabel, FormGroup, Checkbox, useTheme } from '@mui/material';
import { ColorModeContext } from '../../components/Theme/Theme';
import { Root, StyledDiv } from './Settings.styles';
import { MUISwitch } from './components/MUISwitch';
import { ArrowTooltip } from '../../components/ArrowTooltip/ArrowTooltip';

const Settings: React.FC = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const isOverriden = colorMode?.getOverrideStatus();

  return (
    <Root>
      <StyledDiv theme={theme}>
        <h2>Application Settings</h2>
        <hr />
        <h3>Theme</h3>
        <FormGroup>
          <FormControlLabel
            control={
              <ArrowTooltip title="Override mode set in your OS">
                <Checkbox
                  checked={isOverriden}
                  onClick={() => colorMode?.toggleOverride()}
                />
              </ArrowTooltip>
            }
            label={'Override OS preference'}
          />
          {colorMode && isOverriden && (
            <MUISwitch
              isOverriden={isOverriden}
              colorMode={colorMode}
            />
          )}
        </FormGroup>
      </StyledDiv>
    </Root>
  );
};

export { Settings };
