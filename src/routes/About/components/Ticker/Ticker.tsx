import vite from '/vt.svg';
import react from '/rct.svg';
import typeScript from '/ts.svg';
import reactQuery from '/rctqr.png';
import express from '/ejs.png';
import styledComponents from '/sc.png';
import ky from '/ky.svg';
import mui from '/mui.png';
import reactRouter from '/rctrt.png';
import prisma from '/prsm.png';
import planetScale from '/ps.png';
import mySQL from '/mysql.png';

import { Root, Wrapper, ImgStyled } from './Ticker.styles';
import { Fragment } from 'react';

const Ticker: React.FC = () => {
  const loopingArr = ['', '', ''];
  return (
    <Root>
      <Wrapper>
        {loopingArr.map((e, i) => {
          return (
            <Fragment key={i}>
              <a href="https://vitejs.dev/">
                <ImgStyled src={vite} />
              </a>
              <a href="https://react.dev/">
                <ImgStyled src={react} />
              </a>
              <a href="https://www.typescriptlang.org/">
                <ImgStyled src={typeScript} />
              </a>
              <a href="https://tanstack.com/query/latest">
                <ImgStyled src={reactQuery} />
              </a>
              <a href="https://expressjs.com/">
                <ImgStyled src={express} />
              </a>
              <a href="https://styled-components.com/">
                <ImgStyled src={styledComponents} />
              </a>
              <a href="https://github.com/sindresorhus/ky">
                <ImgStyled src={ky} />
              </a>
              <a href="https://mui.com/">
                <ImgStyled src={mui} />
              </a>
              <a href="https://reactrouter.com/en/main">
                <ImgStyled src={reactRouter} />
              </a>
              <a href="https://www.prisma.io/">
                <ImgStyled src={prisma} />
              </a>
              <a href="https://planetscale.com/">
                <ImgStyled src={planetScale} />
              </a>
              <a href="https://www.mysql.com/">
                <ImgStyled src={mySQL} />
              </a>
            </Fragment>
          );
        })}
      </Wrapper>
    </Root>
  );
};

export { Ticker };
