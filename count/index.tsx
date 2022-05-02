import * as React from 'react';
import CountClassComponent from './index_class';
import CountComponent from './index_func';

const Count = () => {
  return (
    <div>
      <CountComponent />
      <CountClassComponent />
    </div>
  );
};

export default Count;
