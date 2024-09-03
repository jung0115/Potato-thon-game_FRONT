// 매수/매도 로딩창
import React from "react";
import { useEffect, useState } from "react";

import styled from "styled-components";
import palette from "../../styles/colorPalatte";

import { LoadingController } from '../../../controller/exchange/LoadingController';

const Loading = ({ closeLoading, time }) => {
  const { imgSrc, potatoSrc, noticeText } = LoadingController({ closeLoading, time });

  return (
    <Container>
      <AnimationImg src={imgSrc} />
      <PotatoImg src={potatoSrc} />
      <NoticeText>{noticeText}</NoticeText>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${palette.loading_bg_color};
  padding: 43px 138px 46px 138px;
  border-radius: 20px;
`;

// 로딩 애니메이션 이미지
const AnimationImg = styled.img`
  width: 74px;
  height: 20px;
  align-self: center;
`;

// 감자톤 캐릭터
const PotatoImg = styled.img`
  width: 129.382px;
  height: 134.423px;
  margin: 20px auto 30px auto;
  padding-right: 20px;
  align-self: center;
`;
// 안내 문구
const NoticeText = styled.div`
  font-size: 18px;
  font-family: 'Pretendard-Bold';
  color: ${palette.black};
  align-self: center;
`;

export default Loading;