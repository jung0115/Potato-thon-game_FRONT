import { useMainModel } from '../model/MainModel';

export const useMainController = () => {
  const { isExchange, isProperty, selectExchange, selectProperty } = useMainModel();

  return {
    isExchange,
    isProperty,
    selectExchange,
    selectProperty,
  };
};