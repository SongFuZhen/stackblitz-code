import * as React from 'react';
import { Typography } from 'antd';
import Count from './count';
import LargeData from './largeData';
import './style.css';
import VirtualList from './virtualList';

const { Title } = Typography;

export default function App() {
  return (
    <div>
      {/* Count */}
      <Title level={3}>Capture Value</Title>
      <Count />

      {/* 大量的数据渲染 */}
      <Title level={3}>Larget Data Render</Title>
      <LargeData />

      {/* 虚拟列表 */}
      <Title level={3}>Virtual List</Title>
      <VirtualList />
    </div>
  );
}
