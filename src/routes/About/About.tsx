import { SubHeader } from '../ReminderWrapper/components/SubHeader/SubHeader';
import { useTheme, Slide } from '@mui/material';
import { Root, Card, Wrapper, ChildDiv } from './About.styles';
import { useEffect, useRef, useState } from 'react';
import { Ticker } from './components/Ticker/Ticker';

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
      <Root>
        <Card theme={theme}>
          <Wrapper theme={theme}>
            <ChildDiv theme={theme}>
              <h1>reminder</h1>
              <br></br> An example Todo list fullstack app built with a modern
              tech stack, like serverless DB, page routing, agnostic server
              queries, and otehr cool stuff<br></br>
              <h2>Tech stack</h2>
              <Ticker />
            </ChildDiv>
          </Wrapper>
        </Card>
      </Root>
    </>
  );
};

export { About };
