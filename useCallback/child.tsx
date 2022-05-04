import * as React from 'react';

interface Props {
  count: number;
  onCallback: (value: number) => void;
}

const DemoUseCallbackChild = ({ count, onCallback }: Props) => {
  return (
    <div>
      Count: {count}, Random: {Math.random()}
    </div>
  );
};

export default React.memo(DemoUseCallbackChild);
