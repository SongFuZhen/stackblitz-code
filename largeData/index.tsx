import * as React from 'react';
import { Space, Button, Typography } from 'antd';

const { Title } = Typography;

const LargeData = () => {
  const total = 10000;

  const emptyFunc = () => {
    const ulDom = document.getElementById('container');
    ulDom.innerHTML = '';
  };

  // 原始渲染
  const case1Func = () => {
    const now = Date.now();

    const ulDom = document.getElementById('container');

    for (let i = 0; i < total; i++) {
      const liDom: any = document.createElement('li');
      liDom.innerText = `${i} :: ${~~(Math.random() * total)}`;
      ulDom.appendChild(liDom);
    }

    console.log('JS 运行时间 : ', Date.now() - now);

    setTimeout(() => {
      console.log('总运行时间 : ', Date.now() - now);
    }, 0);
  };

  // 使用 SetTimeout，分批次进行渲染
  const case2Func = () => {
    const now = Date.now();

    const ulDom = document.getElementById('container');
    const pageSize = 1000;

    function loop(index: number) {
      const realSize = Math.min(pageSize, total - (index - 1) * pageSize);
      if (realSize <= 0) {
        setTimeout(() => {
          console.log('总运行时间 : ', Date.now() - now);
        }, 0);
        return;
      }

      setTimeout(() => {
        for (let i = 0; i < realSize; i++) {
          const liDom: any = document.createElement('li');
          liDom.innerText = `${pageSize * (index - 1) + i} :: ${~~(
            Math.random() * total
          )}`;
          ulDom.appendChild(liDom);
        }

        loop(index + 1);
      }, 0);
    }

    loop(1);
  };

  // 使用 requestAnimationFrame 进行渲染
  const case3Func = () => {
    const now = Date.now();

    const ulDom = document.getElementById('container');
    const pageSize = 1000;

    function loop(index: number) {
      const realSize = Math.min(pageSize, total - (index - 1) * pageSize);
      if (realSize <= 0) {
        setTimeout(() => {
          console.log('总运行时间 : ', Date.now() - now);
        }, 0);
        return;
      }

      window.requestAnimationFrame(() => {
        for (let i = 0; i < realSize; i++) {
          const liDom: any = document.createElement('li');
          liDom.innerText = `${pageSize * (index - 1) + i} :: ${~~(
            Math.random() * total
          )}`;
          ulDom.appendChild(liDom);
        }

        loop(index + 1);
      });
    }

    loop(1);
  };

  // 使用 documentFragment 进行渲染
  const case4Func = () => {
    const now = Date.now();

    const ulDom = document.getElementById('container');
    const pageSize = 1000;

    function loop(index: number) {
      const realSize = Math.min(pageSize, total - (index - 1) * pageSize);
      if (realSize <= 0) {
        setTimeout(() => {
          console.log('总运行时间 : ', Date.now() - now);
        }, 0);
        return;
      }

      window.requestAnimationFrame(() => {
        const fragment: any = document.createDocumentFragment();

        for (let i = 0; i < realSize; i++) {
          const liDom: any = document.createElement('li');
          liDom.innerText = `${pageSize * (index - 1) + i} :: ${~~(
            Math.random() * total
          )}`;

          fragment.appendChild(liDom);
        }

        ulDom.appendChild(fragment);

        loop(index + 1);
      });
    }

    loop(1);
  };

  return (
    <div style={{ padding: 20 }}>
      <Title level={3}> 时间分片，不卡浏览器加载大数据 </Title>

      <Space direction="vertical">
        <Button type="primary" danger onClick={emptyFunc}>
          清空 DOM
        </Button>
        <Button type="primary" onClick={case1Func}>
          Case 1 (原始)
        </Button>
        <Button type="primary" onClick={case2Func}>
          Case 2 (使用 SetTimeout 分批加载)
        </Button>
        <Button type="primary" onClick={case3Func}>
          Case 3 (使用 requestAnimationFrame )
        </Button>
        <Button type="primary" onClick={case4Func}>
          Case 4 (使用 documentFragment)
        </Button>
      </Space>

      <ul id="container"></ul>
    </div>
  );
};

export default LargeData;
