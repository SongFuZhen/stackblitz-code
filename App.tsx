import * as React from 'react';
import Count from './count';
import LargeData from './largeData';
import './style.css';

export default function App() {
  return (
    <div>
      {/* Count */}
      <Count />

      {/* 大量的数据渲染 */}
      <LargeData />
    </div>
  );
}
