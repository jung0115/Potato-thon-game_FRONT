import { useState, useEffect } from 'react';

import loadingAni1 from "../../assets/img_loading1.png";
import loadingAni2 from "../../assets/img_loading2.png";
import loadingAni3 from "../../assets/img_loading3.png";
import loadingAni4 from "../../assets/img_loading4.png";

export const useLoadingModel = (time, closeLoading) => {
  const [imgNum, setImgNum] = useState(0);
  const aniImgs = [loadingAni1, loadingAni2, loadingAni3, loadingAni4];

  useEffect(() => {
    const timer = setTimeout(() => {
      setImgNum(prevImgNum => {
        const nextImgNum = (prevImgNum + 1) % 4; // Ensure it cycles through 0-3
        if (nextImgNum === 0) {
          closeLoading();
        }
        return nextImgNum;
      });
    }, time);

    return () => clearTimeout(timer);
  }, [imgNum, time, closeLoading]);

  return { imgNum, aniImgs };
}