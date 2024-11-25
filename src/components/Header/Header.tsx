import { Card, CardContent, Typography } from '@mui/material';
import './Header.css';

export function Header() {
  return (
    <>
      <div className="header-container">
        <img
          src="https://image.nongshim.com/groupware/DT_web_poster/image/DT_FAIR_logo.gif"
          alt="DT FAIR 2024"
          style={{ width: '400px' }}
        />
        <Card variant="outlined" sx={{ margin: '3rem', marginTop: '3rem' }}>
          <CardContent>
            <Typography sx={{ color: '#333', fontSize: 18, fontWeight: 'bold', marginBottom: '1rem' }}>
              잔여 수량
            </Typography>
            {/* 
              {Object.entries(products).map(([key, product]) => (
                <Typography sx={{ color: 'text.secondary', mb: 1.5 }} key={key}>
                  {product.name}: {product.quantity}개
                </Typography>
              ))} */}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
