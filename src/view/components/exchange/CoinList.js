import styled from 'styled-components';
import palette from "../../styles/colorPalatte";

const CoinList = ({ coins, priceDiffs, onCoinClick }) => {
    const TitleName = ["종목명", "현재가", "대비", "수량"];

    return (
        <Container>
            <Title> 전체 코인 </Title>
            <Line />
            <CoinInfo>
                <CoinInfoTitle>
                    {TitleName.map(item => (
                        <SubTitle> {item} </SubTitle>
                    ))}
                </CoinInfoTitle>
                <Line style={{ 
                    margin: '10px 10px 0 10px',
                    backgroundColor: '#BBBBBB'
                }} />
                <CoinInfoContent>
                    {Array.isArray(coins) && coins.length > 0 ? (
                        coins.map((item) => {
                            const presentPrice = item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                            const priceDiff = priceDiffs[item.id] || 0;
                            
                            return (
                                <CoinInfoSubContent key={item.id} onClick={() => onCoinClick(item)}>
                                    <SubContent>{item.name}</SubContent>
                                    <SubContent style={{ marginLeft: '20px' }} fontColor={priceDiff}> 
                                        {presentPrice} 
                                    </SubContent>
                                    <SubContent style={{ marginLeft: '10px' }} fontColor={priceDiff}> 
                                        {priceDiff !== 0 ? (
                                            <>
                                                {priceDiff > 0 ? '▲' : '▼'} {" "}
                                                {Math.abs(priceDiff).toLocaleString()} 
                                            </>
                                        ) : ('-')}
                                    </SubContent>
                                    <SubContent style={{ marginLeft: '5px' }}> 
                                        {item.amount} 
                                    </SubContent>  
                                </CoinInfoSubContent>      
                            )
                        })
                    ) : (
                        <div>코인 정보가 없습니다.</div>
                    )}
                </CoinInfoContent>
            </CoinInfo>
        </Container>
    );
}

const Container = styled.div`
    display: block;
    background-color: ${palette.bg_color};
    flex-direction: column;
`;
const Title = styled.p`
    margin: 0 auto;
    font-size: 22px;
    font-family: 'Pretendard-Bold';
    color: #FAEBD5;
    margin-left: 4px;
`;
const CoinInfo = styled.div`
    height: 36vh;
    display: flex;
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
    margin-left: 10px;
    text-decoration: none;
    cursor: pointer;
`;
const SubContent = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 25px;
    text-align: center;
    flex: 1;

    font-size: 14.6px;
    font-family: 'Pretendard-Bold';
    color: ${(props) => props.fontColor > 0 ?
        '#AA1919' : props.fontColor < 0 ? 
        '#1F27D7' : '#666666'
    };
`;

export default CoinList;