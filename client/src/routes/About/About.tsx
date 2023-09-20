import { useTheme } from '@mui/material';
import { Root, Card, Wrapper, ChildDiv } from './About.styles';
import { Ticker } from './components/Ticker/Ticker';

export const About: React.FC = () => {
  const theme = useTheme();
  return (
    <>
      <Root>
        <Card theme={theme}>
          <Wrapper theme={theme}>
            <ChildDiv theme={theme}>
              <h1>reminder</h1>
              <br></br> An example Todo list fullstack app built with a modern tech stack, like serverless DB, page
              routing, agnostic server queries, and other cool stuff!<br></br>
              <h2>Tech stack</h2>
              <Ticker />
            </ChildDiv>
          </Wrapper>
        </Card>
      </Root>
    </>
  );
};
