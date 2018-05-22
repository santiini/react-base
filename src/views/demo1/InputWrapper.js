/* eslint-disable */
// 函数式组件
import React from 'react';
import PropTypes from 'prop-types';

const InputWrapper = ({ changeHandle }) => {
  // const changeInput = (e) => {
  //   changeHandle(e.target.value);
  // };
  let input;

  const handleKeydown = (e) => {
    if (input.value.trim() === '') return
    if (e.keyCode === 13) {
      // console.log(input.value)
      changeHandle(input.value);
      input.value = '';
    }
  }

  return (
    <div className="input-wrapper">
      <input
        name="todoName"
        type="text"
        ref={(dom) => input = dom}
        placeholder="请输入todo"
        onKeyDown={(e) => handleKeydown(e)} />
      {/* <input name="todoName" type="text" placeholder="请输入todo" onChange={(e) => changeHandle(e.target.value)} /> */}
    </div>
  )
}

// 使用 prop-types 库验证 props;
InputWrapper.propTypes = {
  changeHandle: PropTypes.func.isRequired,
};

export default InputWrapper;
