import * as React from 'react';
import { Button, Space, Typography } from 'antd';
import './index.css';

const { Title } = Typography;

interface Props {}

type StateProps = {
  count: number;
};

/**
 * Class组件中，Props 和 State 是 Immutable Data
 * this 是 Mutable Data
 * 所以可以通过闭包的方式，实现 Captuer Value
 */
class CountClassComponent extends React.PureComponent<Props, StateProps> {
  constructor(props: any) {
    super(props);

    this.state = {
      count: 0,
    };
  }

  static getDerivedStateFromProps(nextProps: Props, nextState: StateProps) {
    console.log(
      'getDerivedStateFromProps:: nextProps',
      nextProps,
      'nextState',
      nextState
    );

    return null;
  }

  handleAddCount = () => {
    this.setState({
      count: this.state.count + 1,
    });
  };

  handleShowAlert = () => {
    setTimeout(() => {
      alert('current count is ' + this.state.count);
    }, 3000);
  };

  render() {
    const stateValue: StateProps = this.state;

    const handleShowAlert2 = () => {
      setTimeout(() => {
        // 通过闭包实现 Captuer Value
        alert('当前数字是 ' + stateValue.count);
      }, 4000);
    };

    return (
      <div className={'content'}>
        <Title level={2}>(Class) 当前数是 {this.state.count}</Title>

        <Space>
          <Button type="primary" onClick={this.handleAddCount}>
            数字 +1
          </Button>

          <Button type="primary" danger onClick={this.handleShowAlert}>
            3s 后显示 Alert
          </Button>

          <Button type="primary" danger onClick={handleShowAlert2}>
            4s 后显示 Alert
          </Button>
        </Space>
      </div>
    );
  }

  componentDidUpdate(nextProps: Props, nextState: StateProps) {
    console.log(
      'componentDidUpdate:: nextProps',
      nextProps,
      'nextState',
      nextState
    );
  }

  componentDidMount() {
    console.log('mount');
  }
}

export default CountClassComponent;
