import React, { useState, useEffect } from 'react';
import './App.css';
import { Header, Border, Result, Roulette } from './components';
import { grey } from '@mui/material/colors';
import { Wheel } from 'react-custom-roulette';
import { Box, Button, ButtonProps, Modal, styled, Typography, Card, CardContent } from '@mui/material';

import { productList, data } from './data';

function App() {
  const [mustSpin, setMustSpin] = useState(false); // 룰렛 회전

  const [isResultShow, setIsResultShow] = useState<boolean>(false);

  const [showGif, setShowGif] = useState(false);

  const [products, setProducts] = useState(productList);
  const [prize, setPrize] = useState<any>(null);
  const [prizeNumber, setPrizeNumber] = useState(0); // 당첨 번호

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    // 로컬스토리지 상품 정보 불러오기
    // console.log(products);
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }
  }, []);

  const getResultMessage = () => {
    switch (prizeNumber) {
      case 0:
        return '🏆 1등 당첨 🎉';
      case 1:
        return '🥇 2등 당첨 🎁';
      case 2:
        return '🥈 3등 당첨 👏';
      case 3:
        return '🥉 4등 당첨 😉';
      case 4:
        return '📦 4등 당첨 😉';
      case 5:
        return '📦 6등 당첨 😉';
    }
  };

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

  return (
    <>
      <div className="roulette-layout">
        <div className="headerContainer">
          {/* <img
            src="https://image.nongshim.com/groupware/DT_web_poster/image/DT_FAIR_logo.gif"
            alt="DT FAIR 2024"
            style={{ width: '400px' }}
          /> */}
          <h1 style={{ width: '400px', padding: '0', color: 'white' }}>React Roulette Sample</h1>
          <Card variant="outlined" sx={{ margin: '3rem', marginTop: '3rem' }}>
            <CardContent>
              <Typography sx={{ color: '#333', fontSize: 18, fontWeight: 'bold', marginBottom: '1rem' }}>
                잔여 수량
              </Typography>

              {Object.entries(products).map(([key, product]) => (
                <Typography sx={{ color: 'text.secondary', mb: 1.5 }} key={key}>
                  {product.name}: {product.quantity}개
                </Typography>
              ))}
            </CardContent>
          </Card>
        </div>
        <div className="container">
          {/* 테두리 */}
          <Border spin={mustSpin} />
          <div className="innerContainer">
            <Wheel
              mustStartSpinning={mustSpin}
              data={data.map((item) => ({
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
              backgroundColors={data.map((item) => item.style.backgroundColor)}
              textColors={data.map((item) => item.style.textColor)}
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
        </div>
      </div>

      {showGif && (
        <Modal open={true} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img
            src="https://i.namu.wiki/i/aEaRClFwgm0hl2PFb7-j20_WC99GnPFUkg6njz_IckIXXx_UZDELGldWijSZw-IqYOFXeUJNF41HESd380w0Og.gif"
            alt="1등 당첨 축하 GIF"
            style={{ width: '100vw', height: '100vh', objectFit: 'cover' }}
          />
        </Modal>
      )}

      <Modal
        open={isResultShow}
        onClose={() => {
          setIsResultShow(false);
        }}
        style={{ cursor: 'pointer' }}
        onClick={() => {
          setIsResultShow(false);
        }}>
        <Box
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            backgroundColor: 'rgba(255, 255, 255, 1)', // 투명도 10% (0.9)
            width: '50rem', // 크기 조정
            height: '30rem', // 크기 조정
            maxWidth: '100vw',
            maxHeight: '100vh',
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            overflowY: 'auto',
            borderRadius: '1rem',
            flexDirection: 'column',
          }}>
          {data[prizeNumber].image.uri && (
            <img
              src={data[prizeNumber].image.uri}
              alt={data[prizeNumber].option}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                opacity: 0.5,
                objectFit: 'cover',
              }}
            />
          )}
          <span
            style={{
              fontSize: '70px',
              color: 'black',
              fontWeight: 'bold',
              zIndex: 2,
              marginBottom: '2rem',
            }}>
            {getResultMessage()}
          </span>
          <span
            style={{
              fontSize: '40px',
              color: 'black',
              zIndex: 2,
              fontWeight: 'bold',
            }}>
            {prize?.name}
          </span>
        </Box>
      </Modal>
    </>
  );
}

export default App;
