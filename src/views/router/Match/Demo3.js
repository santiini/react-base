import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import { Button } from 'antd'

import SubCom1 from './sub1/Sub1';
import SubCom2 from './sub1/Sub2';
import SubCom3 from './sub1/Sub3';

const Content = ({ match }) => (
  <div>
    <h5>content333 内容部分</h5>
    <div className="">type: {match.params.type}</div>
    <div className="">
      <Link to={`${match.url}/sub1`}>
        <Button>sub1</Button>
      </Link>
      <Link to={`${match.url}/sub2`}>
        <Button>sub2</Button>
      </Link>
      <Link to={`${match.url}/sub3`}>
        <Button>sub3</Button>
      </Link>
    </div>
    <Switch>
      <Route path={`${match.url}/sub1`} component={SubCom1} />
      <Route path={`${match.url}/sub2`} component={SubCom2} />
      {/* 1. 不采用 match.url, 可以在 match.params 中获取所有参数信息 */}
      <Route path="/router1/:type/:id" component={SubCom3} />
      {/* 2. 采用 match.url, 则 match.ul 固定为本页面，所以获取不到 :type 参数*/}
      {/* <Route path={`${match.url}/:id`} component={SubCom3} /> */}
    </Switch>
  </div>
);

export default Content;
// export default withRouter(Content);