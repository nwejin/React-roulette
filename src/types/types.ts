export type PrizeData = {
  option: string;
  style: {
    backgroundColor: string;
    textColor: string;
  };
  probability: number;
  image: {
    uri: string;
    offsetX?: number;
    offsetY?: number;
    sizeMultiplier?: number;
    landscape?: boolean;
  };
};

export type ProductList = {
  [key: string]: { name: string; quantity: number; img: string };
};
