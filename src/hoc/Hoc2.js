// 2. hoc: 反向代理

const addProps = (WrappedComponent) => class extends WrappedComponent {
  componentDidMount() {
    console.log('hoc22 mounted');
  }
  render() {
    return super.render();
  }
};

export default addProps;