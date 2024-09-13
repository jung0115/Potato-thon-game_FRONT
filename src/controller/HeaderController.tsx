import React from "react";
import Header from "../view/components/header/Header";
import HeaderModel from "../model/HeaderModel"
import { useRecoilValue, useSetRecoilState } from "recoil";
import { 
  isExchangeState,
  isPropertyState,
  isExchangeHoverState,
  isPropertyHoverState,
  isSelectLoginState,
  teamNameState
} from "../recoil/recoilState";

interface HeaderControllerProps {
    selectExchange: () => void;
    selectProperty: () => void;
  }

  const HeaderController: React.FC<HeaderControllerProps> = ({
    selectExchange,
    selectProperty
  }) => {
    const isExchange = useRecoilValue(isExchangeState);
    const isProperty = useRecoilValue(isPropertyState);
    const isExchangeHover = useRecoilValue(isExchangeHoverState);
    const isPropertyHover = useRecoilValue(isPropertyHoverState);
    const isSelectLogin = useRecoilValue(isSelectLoginState);
    const teamName = useRecoilValue(teamNameState);

    const setExchangeHover = useSetRecoilState(isExchangeHoverState);
    const setPropertyHover = useSetRecoilState(isPropertyHoverState);
    const setSelectLogin = useSetRecoilState(isSelectLoginState);

    const { onClickExchange, onClickProperty, loginClose } = HeaderModel(selectExchange, selectProperty);
  
    // 사이트명, 로고 선택 시 페이지 새로고치
    const handleRefresh = () => {
        window.location.reload();
    };
    
    return (
        <Header 
            isExchange={isExchange}
            isProperty={isProperty}
            isExchangeHover={isExchangeHover}
            isPropertyHover={isPropertyHover}
            isSelectLogin={isSelectLogin}
            teamName={teamName}
            onClickExchange={onClickExchange}
            onClickProperty={onClickProperty}
            setExchangeHover={setExchangeHover}
            setPropertyHover={setPropertyHover}
            loginClose={loginClose}
            setSelectLogin={setSelectLogin}
            handleRefresh={handleRefresh}/>
    );
};
export default HeaderController;