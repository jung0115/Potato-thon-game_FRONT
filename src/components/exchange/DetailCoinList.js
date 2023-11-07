import React from "react";
import styled from "styled-components";
import palette from "../../styles/colorPalatte";
import closeImg from '../../assets/ic_close.png';

const TitleNmae = ['시간', '현재가', '대비', '수량'];
const Coin = [
    {
        time: '14:40:00',
        purchasingPrice: 810,
        remain: 3,
    },
    {
        time: '14:30:00',
        purchasingPrice: 790,
        remain: 10,
    },
    {
        time: '14:20:00',
        purchasingPrice: 740,
        remain: 20,
    },
    {
        time: '14:10:00',
        purchasingPrice: 815,
        remain: 32,
    },
];

const DetailCoinList = ({ coinName, onClose }) => {
    return (
        <Container>
            <TitleContainer>
                <Title> {coinName} </Title>
                <CloseImg 
                    src={closeImg}
                    onClick={onClose} />
            </TitleContainer>
            <Line />
            <CoinInfo>
                <CoinInfoTitle>
                    {TitleNmae.map(item => (
                        <SubTitle> {item} </SubTitle>
                    ))}
                </CoinInfoTitle>
                <Line style={{ 
                    margin: '10px 10px 0 10px',
                    backgroundColor: '#BBBBBB'
                }} />
                <CoinInfoContent>
                    {Coin.map((item, idx) => {
                        const purchasinPrice = (item.purchasingPrice).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                        let priceDiff = 0;

                        if (idx < Coin.length - 1) {
                            priceDiff = item.purchasingPrice - Coin[idx + 1].purchasingPrice;
                        }

                        return (
                            <CoinInfoSubContent>
                                <SubContent> {item.time} </SubContent>
                                <SubContent 
                                    style={{ marginLeft: '20px' }}
                                    fontColor={priceDiff}
                                > 
                                    {purchasinPrice} 
                                </SubContent>
                                <SubContent 
                                    style={{ marginLeft: '15px' }}
                                    fontColor={priceDiff}
                                > 
                                    {priceDiff != 0 ? (
                                        <>
                                            {priceDiff > 0 ? '▲' : '▼'} {" "}
                                            {Math.abs(priceDiff).toLocaleString()} 
                                        </>) : ('-')
                                    }
                                </SubContent>
                                <SubContent 
                                    style={{ 
                                        marginLeft: '15px',
                                        marginRight: '8px' 
                                    }}
                                > {item.remain} </SubContent>  
                            </CoinInfoSubContent>      
                        )
                    })}
                </CoinInfoContent>
            </CoinInfo>
        </Container>
    );
}

const Container = styled.div`
    display: block;
    flex-direction: column;
`;
const TitleContainer = styled.div`
    display: flex;
    flex-direction: row;
`;
const Title = styled.p`
    margin: 0 auto;
    font-size: 22px;
    font-family: 'Pretendard-Bold';
    color: #FAEBD5;
    margin-left: 4px;
`;
const CloseImg = styled.img`
    width: 15px;
    height: 15px;
    cursor: pointer;
    margin-top: 4px;
    margin-right: 4px;
`;
const CoinInfo = styled.div`
    display: block;
    flex-direction: column;
    margin-top: 15px;
    border-radius: 20px;
    background-color: #E6E6E6;
    box-shadow: inset 0 4px 4px rgba(0, 0, 0, 0.25);
`;
const CoinInfoTitle = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
`;
const SubTitle = styled.p`
    display: flex;
    margin: 25px 35px 10px 35px;
    font-size: 16px;
    color: #666666;
    white-space: nowrap;
    justify-content: space-around;
`;
const CoinInfoContent = styled.div`
    margin-top: 23px;
    overflow: scroll;
`;
const Line = styled.div`
    background-color: ${palette.header_btm_line};
    height: 0.85px;
    margin-top: 10px;
`;
const CoinInfoSubContent = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-left: 10px;
    cursor: pointer;
`;
const SubContent = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 25px;
    text-align: center;
    flex: 1;

    font-size: 16px;
    font-weight: bold;
    color: ${(props) => props.fontColor > 0 ?
        '#AA1919' : props.fontColor < 0 ? 
        '#1F27D7' : '#666666'
    };
`;

export default DetailCoinList;