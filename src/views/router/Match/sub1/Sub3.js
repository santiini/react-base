import React from 'react';

const Content = ({ match }) => {
  console.log(match);
  return (
    <div>
      <h5>sub333: 内容部分</h5>
      <div className="">type:</div>
      <div className="">type: {match.url}</div>
    </div>
  );
};

export default Content;