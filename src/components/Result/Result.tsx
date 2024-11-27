import { Modal, Box } from '@mui/material';
import { useRoulette } from '../../context';

export function Result() {
  const { isResultShow, setIsResultShow, prizeNumber } = useRoulette();

  const getResultMessage = () => {
    switch (prizeNumber) {
      case 0:
        return '🐶';
      case 1:
        return '🐱';
      case 2:
        return '🦊';
      case 3:
        return '🐷';
      case 4:
        return '🐼';
      case 5:
        return '🙈';
    }
  };

  return (
    <>
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
            width: '30rem', // 크기 조정
            height: '20rem', // 크기 조정
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            // overflowY: 'auto',
            borderRadius: '1rem',
            flexDirection: 'column',
          }}>
          <span
            style={{
              fontSize: '180px',
              color: 'black',
              fontWeight: 'bold',
            }}>
            {getResultMessage()}
          </span>
        </Box>
      </Modal>
    </>
  );
}
