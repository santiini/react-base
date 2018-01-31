import React, { Component } from 'react';

class Bundle extends Component {
  state = {
    mod: null,
  }

  load = (props) => {
    this.setState({ mod: null });
    props.load()
      .then((mod) => {
        this.setState({
          mod: mod.default ? mod.default : mod,
        })
      });
  }

  componentWillMount() {
    this.load(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.load !== this.props.load) {
      this.load(nextProps);
    }
  }

  render() {
    return this.state.mod ? this.props.children(this.state.mod) : null;
  }

}

const getComponent = (path) => (props) => (
  <Bundle load={() => import(path)}>
    {(Component) => <Component {...props} />}
  </Bundle>
);

export default getComponent;