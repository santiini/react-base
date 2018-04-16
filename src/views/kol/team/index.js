import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { Button } from 'antd';

import Plan from './plan'
import Compaign from './Compaign'
import Setting from './Setting'

export default class Kol extends React.Component {

  componentDidMount() {
    console.log('did mount'); // 只会触发一次
  }

  componentWillReceiveProps(nextProps) {
    console.log('receive props')
    console.log(this.props.match.params.teamId)
    console.log(nextProps.match.params.teamId)
  }

  shouldComponentUpdate(nextProps) {
    console.log('should update')
    return true;
  }

  render() {
    return (
      <div>
        <div className="">/kol/app/team</div>
        <div>
          <Link to="/kol/app/3/plan">
            <Button>plan</Button>
          </Link>
          <Link to="/kol/app/3/setting">
            <Button>setting</Button>
          </Link>
          <Link to="/kol/app/3/compaign">
            <Button>compaign</Button>
          </Link>
        </div>
        <Switch>
          <Route path="/kol/app/:teamId/plan" component={Plan} />
          <Route path="/kol/app/:teamId/setting" component={Setting} />
          <Route path="/kol/app/:teamId/compaign" component={Compaign} />
        </Switch>
      </div>
    )
  }
}