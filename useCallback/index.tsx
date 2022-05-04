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

      <p>当前数字： {count}</p>

      <DemoUseCallbackChild
        count={count1}
        onCallback={(value: number) => {
          setCount1(value);
        }}
      />

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
