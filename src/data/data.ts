import { ProductList, PrizeData } from '../types';
import { images } from './image';

export const productList: ProductList = {
  prize_1: { name: '강아지', quantity: 2, img: images.dog, icon: '🐶' },
  prize_2: { name: '고양이', quantity: 3, img: images.cat, icon: '🐱' },
  prize_3: { name: '여우', quantity: 5, img: images.fox, icon: '🦊' },
  prize_4: { name: '돼지', quantity: 10, img: images.pig, icon: '🐷' },
  prize_5: { name: '판다', quantity: 30, img: images.panda, icon: '🐼' },
  prize_6: { name: '원숭이', quantity: 150, img: images.monkey, icon: '🙈' },
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
