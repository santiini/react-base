import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import { Button } from 'antd'

import SubCom1 from './sub1/Sub1';
import SubCom2 from './sub1/Sub2';
import SubCom3 from './sub1/Sub3';

const Content = ({ match }) => (
  <div>
    <h5>content1111 内容部分</h5>
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
      <Route path={`${match.url}/:id`} component={SubCom3} />
    </Switch>
  </div>
);

export default Content;
// export default withRouter(Content);