import { Link } from 'react-router-dom';
import { Root } from './OtherOptions.styles';
import { HeaderButton } from '../../../HeaderButton/HeaderButton';
import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone';
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';

const OtherOptions: React.FC = () => {
  return (
    <Root>
      <Link to={'/settings'}>
        <HeaderButton>
          <SettingsTwoToneIcon />
          Settings
        </HeaderButton>
      </Link>
      <Link to={'/about'}>
        <HeaderButton>
          <InfoTwoToneIcon />
          About
        </HeaderButton>
      </Link>
    </Root>
  );
};

export { OtherOptions };
