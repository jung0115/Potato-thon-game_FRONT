import { atom } from "recoil";

export const isExchangeState = atom<boolean>({
    key: "isExchangeState",
    default: false,
});

export const isPropertyState = atom<boolean>({
    key: "isPropertyState",
    default: false,
  });
  
  export const isExchangeHoverState = atom<boolean>({
    key: "isExchangeHoverState",
    default: false,
  });
  
  export const isPropertyHoverState = atom<boolean>({
    key: "isPropertyHoverState",
    default: false,
  });
  
  export const isSelectLoginState = atom<boolean>({
    key: "isSelectLoginState",
    default: false,
  });
  
  export const teamNameState = atom<string>({
    key: "teamNameState",
    default: "",
  });