import CoinListModel from "../model/CoinListModel";
import CoinList from "../view/components/exchange/CoinList";
import DetailCoinListModel from "../model/coinList/DetailCoinListModel";

const CoinListController = ({ onCoinClick }) => {
    const { coins, priceDiffs, getCoinHistories } = useContext(CoinContext);
    const { currentPrice, remainAmount, priceDifferencesCal } = DetailCoinListModel(selectedCoin);

    const handleCoinClick = (item) => {
        setSelectedCoin(item.name);
        setDetailOpen(true);
    };

    const handleClose = () => {
        setDetailOpen(false);
    };

    return (
        <>
            <CoinList
                coins={coins}
                priceDiffs={priceDiffs}
                onCoinClick={handleCoinClick}/>
                {isDetailOpen && (
                    <DetailCoinList
                        coinName={selectedCoin}
                        onClose={handleClose}
                        currentPrice={currentPrice}
                        remainAmount={remainAmount}
                        priceDifferencesCal={priceDifferencesCal}/>
                )}
        </>
    )
}
export default CoinListController;