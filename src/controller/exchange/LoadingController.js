import { useLoadingModel } from '../../model/exchange/LoadingModel';
import potato from "../../assets/img_potato_angry.png";

export const LoadingController = ({ closeLoading, time }) => {
  const { imgNum, aniImgs } = useLoadingModel(time, closeLoading);
  return {
    imgSrc: aniImgs[imgNum],
    potatoSrc: potato,
    noticeText: "처리 중입니다"
  };
};