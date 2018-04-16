import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { Button } from 'antd';

import Detail from './Detail';
import Add from './Add';
import Search from './Search';
import AddModel from './AddModel';

class Plan extends Component {
  render() {
    return (
      <div>
        <div>/team/plan</div>
        <div>
          <Link to="/kol/app/3/plan/1">
            <Button>detail</Button>
          </Link>
          <Link to="/kol/app/3/plan/add">
            <Button>add</Button>
          </Link>
          <Link to="/kol/app/3/plan/search?name=101">
            <Button>search</Button>
          </Link>
        </div>
        <AddModel />
        <Switch>
          <Route path="/kol/app/:teamId/plan/add" exact component={Add} />
          <Route path="/kol/app/:teamId/plan/search" component={Search} />
          <Route path="/kol/app/:teamId/plan/:id" component={Detail} />
        </Switch>
      </div>
    );
  }
}

export default Plan;