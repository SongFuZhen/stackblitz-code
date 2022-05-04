import * as React from 'react';
import { Button, Typography, Space } from 'antd';
import DemoUseCallbackChild from './child';

const { Title } = Typography;

const DemoUseCallback = () => {
  const [count, setCount] = React.useState(0);
  const [count1, setCount1] = React.useState(0);
  const [count2, setCount2] = React.useState(0);

  return (
    <React.Fragment>
      <Title level={3}>更新 Count，Child1 会渲染, Child2 不渲染 </Title>

      <Title level={4}>Count： {count}</Title>
      <Space>
        <Button
          type="primary"
          onClick={() => {
            setCount(count + 1);
          }}
        >
          数字 +1
        </Button>

        <Button
          type="primary"
          onClick={() => {
            setCount2(count2 + 1);
          }}
        >
          数字2 +1
        </Button>
      </Space>

      <Title level={4}>Count1: {count1}</Title>
      <DemoUseCallbackChild
        count={count1}
        onCallback={(value: number) => {
          setCount1(value);
        }}
      />
      <br />
      <Title level={4}>Count2: {count2}</Title>
      <DemoUseCallbackChild
        count={count2}
        onCallback={React.useCallback(
          (value: number) => {
            setCount2(value);
          },
          [count2]
        )}
      />
    </React.Fragment>
  );
};

export default DemoUseCallback;
