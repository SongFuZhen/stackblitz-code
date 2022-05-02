import * as React from 'react';
import { Button, Space, Typography } from 'antd';
import './index.css';

const { Title } = Typography;

interface Props {}

type StateProps = {
  count: number;
};

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
