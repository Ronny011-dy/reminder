import { ContextParams } from '../../../components/Theme/Theme';
import { Root, MaterialUISwitch } from './MUISwitch.styles';

type MUISwitchProps = {
  isOverriden: boolean;
  colorMode: ContextParams;
};

export const MUISwitch: React.FC<MUISwitchProps> = ({ isOverriden, colorMode }) => {
  return (
    <Root
      disabled={!isOverriden}
      control={
        <MaterialUISwitch
          sx={{ m: 1 }}
          onChange={() => colorMode.toggleColorMode()}
          checked={colorMode.getThemePreference() === 'dark' ? true : false}
        />
      }
      label={`${colorMode.getThemePreference() === 'dark' ? 'Dark' : 'Light'} mode`}
    />
  );
};
