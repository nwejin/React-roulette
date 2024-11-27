import React, { createContext, useContext, useState, ReactNode } from 'react';
import { PrizeData, ProductList } from '../types';
import { productList, data } from '../data';

type RouletteContextType = {
  mustSpin: boolean;
  setMustSpin: React.Dispatch<React.SetStateAction<boolean>>;
  isResultShow: boolean;
  setIsResultShow: React.Dispatch<React.SetStateAction<boolean>>;
  showGif: boolean;
  setShowGif: React.Dispatch<React.SetStateAction<boolean>>;
  products: ProductList;
  setProducts: React.Dispatch<React.SetStateAction<ProductList>>;
  prize: PrizeData | null;
  setPrize: React.Dispatch<React.SetStateAction<PrizeData | null>>;
  prizeNumber: number;
  setPrizeNumber: React.Dispatch<React.SetStateAction<number>>;
  isButtonDisabled: boolean;
  setIsButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
};

const RouletteContext = createContext<RouletteContextType | undefined>(undefined);

export const RouletteProvider = ({ children }: { children: ReactNode }) => {
  const [mustSpin, setMustSpin] = useState(false);
  const [isResultShow, setIsResultShow] = useState<boolean>(false);
  const [showGif, setShowGif] = useState(false);
  const [products, setProducts] = useState<ProductList>(productList);
  const [prize, setPrize] = useState<any>(null);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  return (
    <RouletteContext.Provider
      value={{
        mustSpin,
        setMustSpin,
        isResultShow,
        setIsResultShow,
        showGif,
        setShowGif,
        products,
        setProducts,
        prize,
        setPrize,
        prizeNumber,
        setPrizeNumber,
        isButtonDisabled,
        setIsButtonDisabled,
      }}>
      {children}
    </RouletteContext.Provider>
  );
};

export const useRoulette = () => {
  const context = useContext(RouletteContext);
  if (!context) {
    throw new Error('useRoulette must be used within a RouletteProvider');
  }
  return context;
};
