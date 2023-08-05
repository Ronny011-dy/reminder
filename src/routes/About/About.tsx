import { SubHeader } from '../ReminderWrapper/components/SubHeader/SubHeader';
import { useTheme, Slide } from '@mui/material';
import { Root, ImgStyled, TickerStyled } from './About.styles';
import { useEffect, useRef, useState } from 'react';

const About: React.FC = () => {
  const subHeaderRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const theme = useTheme();
  return (
    <>
      <Slide
        in={isVisible}
        direction="down"
        appear={false}
        easing={'cubic-bezier( 0.79, 0.33, 0.14, 0.53 )'}
        timeout={750}
      >
        <SubHeader ref={subHeaderRef} />
      </Slide>
      <Root theme={theme}>
        <div>
          reminder<br></br> An example Todo list fullstack app build with Vite
          and Typescript react on top of PlanentScale serverless DB with Prisma
          query handling<br></br>Technologies
          <TickerStyled>
            <ImgStyled src="https://upload.wikimedia.org/wikipedia/commons/f/f1/Vitejs-logo.svg" />
            <ImgStyled src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" />
            <ImgStyled src="https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg" />
          </TickerStyled>
        </div>
      </Root>
    </>
  );
};

export { About };
