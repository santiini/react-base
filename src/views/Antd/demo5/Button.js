import React from 'react'

const Button = (props) => {
  const {
    size, type, children, ...others,
  } = props;
  console.log(others);
  const ComponentProps = others.href ? 'a' : 'button';
  return (
    <ComponentProps href="/">
      {children}
    </ComponentProps>
  );
};

export default Button;