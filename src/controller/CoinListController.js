import CoinListModel from "../model/CoinListModel";
import CoinList from "../view/components/exchange/CoinList";

const CoinListController = ({ onCoinClick }) => {
    const { coins, priceDiffs, getCoinHistories } = CoinListModel();
    const [isDetailOpen, setDetailOpen] = useState(false);  
    const [present, setPresent] = useState(new Date());
    const [currentTime, setCurrentTime] = useState(new Date());

    // 코인 리스트 가져오면 코인별 가격, 대비 등 데이터 가져오기
    useEffect(() => {
        coins.forEach(coin => {
            getCoinHistories(coin.id);
        });
    }, [coins]);

    // 1분마다 체크 ---------------------------------------------------------------------------------------------------------
    useEffect(() => {
        // 1초마다 현재 시간을 업데이트
        const interval = setInterval(() => {
        setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        // 1분마다 코인 증감 데이터 조회 api 호출
        // 너무 자주 api 호출하면 fetch 오류 발생
        const currentSecond = currentTime.getSeconds();
        if(currentSecond == 0) {
            coins.forEach(coin => {
                getCoinHistories(coin.id);
            });
        } 
    }, [currentTime]);

    const CoinClick = (item) => {
        setDetailOpen(true);
        onCoinClick(item.name + " 코인");
    }

    return (
        <CoinList
            coins={coins}
            priceDiffs={priceDiffs}
            onCoinClick={CoinClick}
            isDetailOpen={isDetailOpen}/>
    )
}
export default CoinListController;