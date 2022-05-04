import * as React from 'react';
import { Typography, Divider } from 'antd';
import Count from './count';
import LargeData from './largeData';
import './style.css';
import VirtualList from './virtualList';
import DemoUseCallback from './useCallback';
import DemoUseMemo from './useMemo';

const { Title } = Typography;

export default function App() {
  return (
    <div>
      {/* Count */}
      <Title level={3}>Capture Value</Title>
      <Count />

      <Divider>Captuer Value End</Divider>

      {/* 大量的数据渲染 */}
      <Title level={3}>Larget Data Render</Title>
      <LargeData />
      <Divider>Large Data End</Divider>

      {/* 虚拟列表 */}
      <Title level={3}>Virtual List</Title>
      <VirtualList />
      <Divider>Virtual List End</Divider>

      {/* useCallback */}
      <Title level={3}>useCallback</Title>
      <DemoUseCallback />
      <Divider>useCallback End</Divider>

      {/* useMemo */}
      <Title level={3}>useMemo</Title>
      <DemoUseMemo />

      <Divider>useMemo End</Divider>
    </div>
  );
}
