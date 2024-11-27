import React, { useEffect } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import './Header.css';
import { useRoulette } from '../../context';

export function Header() {
  const { products, setProducts } = useRoulette();

  useEffect(() => {
    // 로컬스토리지 상품 정보 불러오기
    // console.log(products);
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }
  }, []);

  return (
    <>
      <div className="header-container">
        <h1 style={{ width: '400px', padding: '0', color: 'white' }}>React Roulette Sample</h1>
        <Card variant="outlined" sx={{ margin: '3rem' }}>
          <CardContent>
            <Typography sx={{ color: '#333', fontSize: 18, fontWeight: 'bold', marginBottom: '1rem' }}>
              잔여 수량
            </Typography>

            {Object.entries(products).map(([key, product]) => (
              <Typography sx={{ color: 'text', mb: 1.5 }} key={key}>
                {product.icon}: {product.quantity}
              </Typography>
            ))}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
