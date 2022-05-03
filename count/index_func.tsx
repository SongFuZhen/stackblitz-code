import * as React from 'react';
import { Button, Space, Typography } from 'antd';
import './index.css';

const { Title } = Typography;

const CountComponent = () => {
  const [count, setCount] = React.useState<number>(0);

  const handleAddCount = () => {
    // use
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
      <Title level={4}>(Func) 当前数是 {count}</Title>

      <Space>
        <Button type="primary" onClick={handleAddCount}>
          数字 +1
        </Button>

        <Button type="primary" danger onClick={handleShowAlert}>
          3s 后显示 Alert
        </Button>
      </Space>
    </div>
  );
};

export default CountComponent;
