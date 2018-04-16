import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class AddModel extends Component {
  render() {
    console.log(this.props.match);
    return (
      <div>
        <div>add model</div>
      </div>
    );
  }
}

// withRoute 可以使组件内使用 match, location, history 等
// export default AddModel;
export default withRouter(AddModel);