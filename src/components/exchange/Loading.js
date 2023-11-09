// 매수/매도 로딩창
import React from "react";
import { useEffect, useState } from "react";

import styled from "styled-components";
import palette from "../../styles/colorPalatte";

import potato from "../../contents/img_potato_angry.png";
import loadingAni1 from "../../contents/img_loading1.png";
import loadingAni2 from "../../contents/img_loading2.png";
import loadingAni3 from "../../contents/img_loading3.png";
import loadingAni4 from "../../contents/img_loading4.png";

const Question = ({ closeLoading, time }) => {
  const [imgNum, setImgNum] = useState(0);
  const aniImgs = [loadingAni1, loadingAni2, loadingAni3, loadingAni4];

  setTimeout(() => {setImgNum((imgNum + 1)); if(imgNum > 4) closeLoading();}, time);

  return(
    <Container>
      <AnimationImg src={aniImgs[imgNum % 4]}/>
      <PotatoImg src={potato}/>
      <NoticeText>처리 중입니다</NoticeText>
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

export default Question;