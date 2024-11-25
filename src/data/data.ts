import { ProductList, PrizeData } from '../types';
import prize1 from './prize1.png';
import prize2 from './prize2.png';

export const productList: ProductList = {
  prize_1: { name: '상품 1', quantity: 2, img: prize1 },
  prize_2: { name: '상품 2', quantity: 3, img: prize2 },
  prize_3: { name: '상품 3', quantity: 5, img: prize1 },
  prize_4: { name: '상품 4', quantity: 10, img: prize2 },
  prize_5: { name: '상품 5', quantity: 30, img: prize1 },
  prize_6: { name: '상품 6', quantity: 150, img: prize2 },
};

const rouletteRed = '#CD2B33';
const rouletteWhite = '#ffffff';

export const data: PrizeData[] = [
  {
    option: productList.prize_1.name,
    style: { backgroundColor: rouletteRed, textColor: '#FFFFFF' },
    probability: productList.prize_1.quantity > 0 ? 3 : 0, // 재고 수량에 따른 확률 설정
    image: {
      uri: productList.prize_1.img,
    },
  },
  {
    option: productList.prize_2.name,
    style: { backgroundColor: rouletteWhite, textColor: '#868686' },
    probability: productList.prize_2.quantity > 0 ? 7 : 0, // 재고 수량에 따른 확률 설정
    image: { uri: productList.prize_2.img },
  },
  {
    option: productList.prize_3.name,
    style: { backgroundColor: rouletteRed, textColor: '#FFFFFF' },
    probability: productList.prize_3.quantity > 0 ? 15 : 0, // 재고 수량에 따른 확률 설정
    image: { uri: productList.prize_3.img },
  },
  {
    option: productList.prize_4.name,
    style: { backgroundColor: rouletteWhite, textColor: '#868686' },
    probability: productList.prize_4.quantity > 0 ? 25 : 0, // 재고 수량에 따른 확률 설정
    image: { uri: productList.prize_4.img },
  },
  {
    option: productList.prize_5.name,
    style: { backgroundColor: rouletteRed, textColor: '#ffffff' },
    probability: productList.prize_5.quantity > 0 ? 25 : 0, // 재고 수량에 따른 확률 설정
    image: { uri: productList.prize_5.img },
  },
  {
    option: productList.prize_6.name,
    style: { backgroundColor: rouletteWhite, textColor: '#868686' },
    probability: 50, // 꽝은 항상 확률 유지
    image: { uri: productList.prize_6.img },
  },
];
