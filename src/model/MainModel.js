import { useState, useEffect } from 'react';

export const useMainModel = () => {
  const [isExchange, setExchange] = useState(true);  // 헤더에서 거래소 탭 선택 유무
  const [isProperty, setProperty] = useState(false); // 헤더에서 자산 탭 선택 유무

  // 거래소탭 선택
  const selectExchange = () => {
    setExchange(true);
    setProperty(false);
  }

  // 자산 탭 선택
  const selectProperty = () => {
    setExchange(false);
    setProperty(true);
  }

  // 탭 선택 변할 때마다 새로고침
  useEffect(() => {
  }, [isExchange, isProperty]);

  return {
    isExchange,
    isProperty,
    selectExchange,
    selectProperty,
  };
};