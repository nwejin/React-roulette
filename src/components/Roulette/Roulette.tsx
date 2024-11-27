import { Wheel } from 'react-custom-roulette';
import { grey } from '@mui/material/colors';
import { Button, ButtonProps, styled } from '@mui/material';
import { useRoulette } from '../../context';
import { data } from '../../data';

import './Roulette.css';

export function Roulette() {
  const StartButton = styled(Button)<ButtonProps>(({ theme }) => ({
    border: 'none',
    width: '12rem',
    height: '12rem',
    borderRadius: '50%',
    fontSize: '2rem',
    zIndex: '1000',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
    color: '#333',
    backgroundColor: '#ffffff',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: '#020b3e',
      color: '#ffffff',
      border: 'none',
    },
  }));

  const {
    products,
    setProducts,
    setPrize,
    prizeNumber,
    setPrizeNumber,
    mustSpin,
    setMustSpin,
    setIsResultShow,
    isButtonDisabled,
    setIsButtonDisabled,
    setShowGif,
  } = useRoulette();

  const handleRouletteStart = () => {
    if (isButtonDisabled) return; // 버튼이 비활성화되어 있으면 실행하지 않음

    setIsButtonDisabled(true); // 버튼 비활성화

    const availableProducts = Object.values(products).filter((product) => product?.quantity > 0); // 수량이 0개 이상인

    if (availableProducts.length === 0) {
      alert('모든 상품이 소진되었습니다! 😭');
      setIsButtonDisabled(false);
      return;
    }

    // 새로운 배열을 합치는 flatMap
    const weightedProducts = availableProducts.flatMap((product) => Array(product.quantity).fill(product));

    const randomIndex = Math.floor(Math.random() * weightedProducts.length);
    const selectedPrize = weightedProducts[randomIndex];

    // 상품 배열에서 인덱스 찾기
    const productArray = Object.values(products);
    const prizeIndex = productArray.findIndex((product) => product.name === selectedPrize.name);

    setPrizeNumber(prizeIndex); // 당첨 상품 인덱스 설정

    setProducts((prevProducts) => {
      const foundKey = Object.keys(prevProducts).find((key) => prevProducts[key].name === selectedPrize.name);

      if (!foundKey) {
        console.error('상품 키를 찾을 수 없습니다.');
        setIsButtonDisabled(false);
        return prevProducts; // 오류 방지: 키를 찾지 못한 경우 기존 상태 반환
      }

      const updatedProducts = {
        ...prevProducts,
        [foundKey]: {
          ...prevProducts[foundKey],
          quantity: prevProducts[foundKey].quantity - 1,
        },
      };

      // 로컬스토리지에 업데이트된 상태 저장
      localStorage.setItem('products', JSON.stringify(updatedProducts));

      return updatedProducts;
    });

    setPrize(selectedPrize);

    setMustSpin(true);

    setTimeout(() => {
      // 1등 당첨 시 GIF 표시
      if (prizeIndex === 0) {
        setShowGif(true);
        setTimeout(() => {
          setShowGif(false);
          setIsResultShow(true);
        }, 2000); // 2초간 GIF 표시 후 숨김
      } else {
        setIsResultShow(true);
      }

      setTimeout(() => {
        setIsButtonDisabled(false); // 5초 후 버튼 활성화
      }, 5000);
    }, 3000);
  };

  return (
    <div className="roulette-container">
      <Wheel
        mustStartSpinning={mustSpin}
        data={data.map((item: any) => ({
          option: item.option,
          style: item.style,
          image: item.image,
        }))}
        // startingOptionIndex={0}
        prizeNumber={prizeNumber}
        outerBorderColor={grey[300]}
        outerBorderWidth={0}
        innerBorderWidth={1}
        innerBorderColor={grey[300]}
        radiusLineWidth={0}
        innerRadius={10}
        fontSize={13}
        onStopSpinning={() => {
          setMustSpin(false);
          // saveResult();
        }}
        spinDuration={0.5}
        backgroundColors={data.map((item: any) => item.style.backgroundColor)}
        textColors={data.map((item: any) => item.style.textColor)}
        pointerProps={{
          src: '', // 커서 이미지 URL
          style: { display: 'none' },
        }}
        perpendicularText={true}
        textDistance={75}
      />
      <div className="btn-container">
        <StartButton
          variant="outlined"
          size="large"
          className="startBtn"
          onClick={handleRouletteStart} // 음성 인식 시작
          disabled={isButtonDisabled}>
          Start
        </StartButton>
      </div>
    </div>
  );
}
