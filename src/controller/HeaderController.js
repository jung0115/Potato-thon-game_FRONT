import Header from "../components/header/Header";
import useHeaderModel from "../model/useHeaderModel"

const HeaderController = ({ exchange, property, selectExchange, selectProperty }) => {
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
    } = useHeaderModel(exchange, property, selectExchange, selectProperty);

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