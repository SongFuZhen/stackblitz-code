import * as React from 'react';

const DemoUseMemoChild = ({ todoList }: TodoListProps) => {
  return (
    <div>
      {JSON.stringify(todoList)} {Math.random()}
    </div>
  );
};

export default React.memo(DemoUseMemoChild);
