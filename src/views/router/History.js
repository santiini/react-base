import React from 'react';
import { Button } from 'antd';
import { Route } from 'react-router-dom';

const Content1 = ({ history, match, location }) => (
  <div>
    <h4>content: 内容部分11</h4>
    <div className="">{location.state.from}</div>
  </div>
);
const Content2 = ({ history, match, location }) => (
  <div>
    <h4>content: 内容部分22</h4>
    <div className="">{location.state.from}</div>
  </div>
);

const HistoryDemo1 = ({ history, match }) => {
  const toLink1 = () => {
    history.push({
      pathname: `${match.url}/test1`,
      state: {
        from: 'router2: test1',
      },
    })
  };
  const toLink2 = () => {
    history.push({
      pathname: `${match.url}/test2`,
      state: {
        from: 'router2: test2',
      },
    })
  };

  return (
    <div>
      <h4>History实现路由跳转</h4>
      <Button onClick={toLink1}>跳转1</Button>
      <Button onClick={toLink2}>跳转2</Button>

      <Route path={`${match.url}/test1`} component={Content1} />
      <Route path={`${match.url}/test2`} component={Content2} />
    </div>
  );
};

export default HistoryDemo1;