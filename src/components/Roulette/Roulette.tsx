import { useState } from 'react';

import { Wheel } from 'react-custom-roulette';
import { grey } from '@mui/material/colors';

export function Roulette() {
  const [mustSpin, setMustSpin] = useState(false); // 룰렛 회전
  return (
    <>
      {/* <Wheel
        mustStartSpinning={mustSpin}
        data={}
        // startingOptionIndex={0}
        prizeNumber={}
        outerBorderColor={grey[300]}
        outerBorderWidth={0}
        innerBorderWidth={1}
        innerBorderColor={grey[300]}
        radiusLineWidth={0}
        innerRadius={10}
        fontSize={13}
        onStopSpinning={() => {
          //   setMustSpin(false);
          // saveResult();
        }}
        spinDuration={0.5}
        backgroundColors={}
        textColors={}
        pointerProps={{
          src: '', // 커서 이미지 URL
          style: { display: 'none' },
        }}
        perpendicularText={true}
        textDistance={75}
      /> */}
    </>
  );
}
