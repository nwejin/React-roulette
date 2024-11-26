import { Wheel } from 'react-custom-roulette';
import { grey } from '@mui/material/colors';
import { Button, ButtonProps, styled } from '@mui/material';

export function Roulette(rouletteData: any) {
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

  const { mustSpin, setMustSpin, prizeNumber, data, isButtonDisabled, handleRouletteStart } = rouletteData;

  console.log(data.data);
  return (
    <>
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
    </>
  );
}
