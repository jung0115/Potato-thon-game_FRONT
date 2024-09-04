import styled from "styled-components";
import palette from "../../styles/colorPalatte";

import closeImg from '../../../assets/ic_close.png';

const TitleNmae = ['시간', '현재가', '대비', '수량'];

const DetailCoinList = ({ 
    coinName, 
    onClose, 
    currentPrice, 
    remainAmount, 
    priceDifferencesCal 
}) => {
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
                    {currentPrice.slice(0, 10).map((item, idx) => {
                        const presentPrice = item.price;
                        const priceDifferences = priceDifferencesCal();
                        const priceDiff = priceDifferences[idx];

                        // if (idx < currentPrice.length - 1) {
                        //     previousPrice = currentPrice[idx + 1].price;
                        // }

                        // const priceDiff = presentPrice - previousPrice;

                        const fmTimestamp = (timestamp) => {
                            const date = new Date(timestamp);
                            const hour = date.getHours().toString().padStart(2, '0');
                            const min = date.getMinutes().toString().padStart(2, '0');
                            const sec = date.getSeconds().toString().padStart(2, '0');

                            return `${hour}:${min}:${sec}`;
                        }

                        return (
                            <CoinInfoSubContent>
                                <SubContent> {fmTimestamp(item.timestamp)} </SubContent>
                                <SubContent 
                                    style={{ marginLeft: '20px' }}
                                    fontColor={priceDiff}
                                > 
                                    {presentPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 
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
                                > {remainAmount} </SubContent>  
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
    display: flex;
    height: 36vh;
    overflow: hidden;
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
    overflow-y: scroll;
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
`;
const SubContent = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 25px;
    text-align: center;
    flex: 1;

    font-size: 16px;
    font-family: 'Pretendard-Bold';
    color: ${(props) => props.fontColor > 0 ?
        '#AA1919' : props.fontColor < 0 ? 
        '#1F27D7' : '#666666'
    };
`;

export default DetailCoinList;