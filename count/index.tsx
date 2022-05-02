import * as React from 'react';
import { Button, Space, Typography } from 'antd';
import './index.css';

const { Title } = Typography;

const CountComponent = () => {
  const [count, setCount] = React.useState<number>(0);

  const handleAddCount = () => {
    setCount((prevCount) => prevCount + 1);
    // setCount(count + 1);
  };

  const handleShowAlert = () => {
    // capture value
    setTimeout(() => {
      alert('current count is ' + count);
    }, 3000);
  };

  return (
    <div className={'content'}>
      <Title level={3}>current count is {count}</Title>

      <Space>
        <Button type="primary" onClick={handleAddCount}>
          Add Count
        </Button>

        <Button onClick={handleShowAlert}>Show Alert Count</Button>
      </Space>
    </div>
  );
};

export default CountComponent;
