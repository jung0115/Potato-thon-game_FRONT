// 거래소 탭
import React from "react";
import { useEffect, useState } from "react";

import styled from "styled-components";
import palette from "../../styles/colorPalatte";

const ExchangeTab = () => {
  return(
    <Container>
      <Title>실시간 주식 차트</Title>

    </Container>
  );
}

const Container = styled.div`
  display: block;
  background-color: ${palette.bg_color};
`;

// 제목: 실시간 주식 차트
const Title = styled.div`
  font-size: 23px;
  font-family: 'Pretendard-Bold';
  color: ${palette.sub_title};
  margin: 44px 0px 30px 41px;
`;

export default ExchangeTab;