import pointerImg from './pointer.png';
import './Border.css';
import { useRoulette } from '../../context';

export function Border() {
  const { mustSpin } = useRoulette();

  const borderWidth = 15;
  const smallCircleRadius = 3;
  const numCircles = 12;
  const svgSize = 220;
  const outerRadius = (svgSize - borderWidth) / 2;

  return (
    <>
      <div className="border-container">
        <div className={`pointer-container ${mustSpin ? 'spinning' : ''}`}>
          <img src={pointerImg} alt="pointer" style={{ width: '120px' }} />
        </div>
        <div className="border-wrapper">
          {/* 벡터이미지 사용 */}
          <svg viewBox={`0 0 ${svgSize} ${svgSize}`} className="roulette-svg">
            {/* 큰 원 (테두리) */}
            <circle
              cx={svgSize / 2}
              cy={svgSize / 2}
              r={outerRadius}
              fill="none"
              stroke="#020b3e"
              strokeWidth={borderWidth}
            />

            {/* 작은 원 */}
            {[...Array(numCircles)].map((_, index) => {
              const angle = (index / numCircles) * 2 * Math.PI;
              const x = svgSize / 2 + outerRadius * Math.cos(angle);
              const y = svgSize / 2 + outerRadius * Math.sin(angle);

              return <circle key={index} cx={x} cy={y} r={smallCircleRadius} fill="white" />;
            })}
          </svg>
        </div>
      </div>
    </>
  );
}
