import React from "react";
import Header from "../view/components/header/Header";
import HeaderModel from "../model/HeaderModel"

interface HeaderControllerProps {
    exchange: boolean;
    property: boolean;
    selectExchange: () => void;
    selectProperty: () => void;
  }

  const HeaderController: React.FC<HeaderControllerProps> = ({
    exchange,
    property,
    selectExchange,
    selectProperty
  }) => {
    const {
      isExchange, 
      isProperty, 
      isExchangeHover,
      isPropertyHover,
      isSelectLogin,
      teamName, 
      onClickExchange, 
      onClickProperty,
      setExchangeHover,
      setPropertyHover,
      loginClose,
      setSelectLogin
    } = HeaderModel(exchange, property, selectExchange, selectProperty);
  
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