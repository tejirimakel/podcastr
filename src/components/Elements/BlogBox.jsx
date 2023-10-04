import React from 'react';
import styled from 'styled-components';

export default function BlogBox({ thumbnail, title, text, link, author }) {
  return (
    <WrapperBtn className="animate pointer" href={link} target="_blank">
      <Wrapper className="whiteBg radius8 shadow">
        <ImgWrapper>
          <ImgWrap src={thumbnail} alt={title} />
        </ImgWrapper>
        <H3Wrap className="font20 extraBold" title={title}>
          {title}
        </H3Wrap>
        <PWrap className="font13" title={text}>
          {text}
        </PWrap>
        <DateWrap className="font13">{author}</DateWrap>
      </Wrapper>
    </WrapperBtn>
  );
}

const Wrapper = styled.div`
  width: 100%;
  text-align: left;
  padding: 0;
  margin-top: 30px;
  overflow: hidden;
`;
const ImgWrapper = styled.div`
  width: 100%;
  text-align: left;
  padding: 0;
  margin: 0 0 15px;
  height: 200px;
  overflow-y: hidden;
`;
const ImgWrap = styled.img`
  width: 100%;
`;
const H3Wrap = styled.h3`
  height: 48px;
  padding: 0 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;
const PWrap = styled.p`
  text-align: justify;
  height: 100px;
  padding: 5px 15px 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;
const DateWrap = styled.p`
  text-align: right;
  padding: 5px 15px 15px;
  font-style: italic;
`;
const WrapperBtn = styled.a`
  border: 0px;
  outline: none;
  background-color: transparent;
  :hover {
    opacity: 0.5;
  }
`;
