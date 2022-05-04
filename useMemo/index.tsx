import * as React from 'react';
import { Button, Typography, Space } from 'antd';
import DemoUseMemoChild from '../useMemo/child';

const { Title } = Typography;

const DemoUseMemo = () => {
  const [count, setCount] = React.useState(0);
  const [value, setValue] = React.useState(0);

  // 使用 useMemo，防止 value 更新的时候，一起更新
  const treatCountMemo = React.useMemo(() => {
    console.log('useMemo treat Count Update');
    return count + 10;
  }, [count]);

  const treatCount = () => {
    console.log('treat Count Update');
    return count + 10;
  };

  // 默认的 TodoList，在 memo 组件中，会做浅比较，对象会每次更新
  const todoList = [{ id: 1, name: 'test' }];

  // 使用 useMemo，可以有效方式多次渲染
  const todoListMemo = React.useMemo(() => {
    const value: todoProps[] = [{ id: 1, name: 'test' }];
    return value;
  }, []);

  return (
    <React.Fragment>
      <Title level={4}>Value: {value}, </Title>
      <Title level={4}>Treat Count: {treatCount()}, </Title>
      <Title level={4}>useMemo Treat Count: {treatCountMemo}, </Title>
      <Title level={4}> Count: {count}</Title>
      <Space direction="horizontal">
        <Button
          type="primary"
          onClick={() => {
            setValue(value + 1);
          }}
        >
          改变 Value
        </Button>

        <Button
          type="primary"
          onClick={() => {
            setCount(count + 1);
          }}
        >
          改变 Count
        </Button>
      </Space>

      <br />
      <br />

      <Title level={4}> Todo List Child</Title>

      <b>没有 useMemo</b>
      <DemoUseMemoChild todoList={todoList} />
      <br />
      <b>有 Memo</b>
      <DemoUseMemoChild todoList={todoListMemo} />
    </React.Fragment>
  );
};

export default DemoUseMemo;
