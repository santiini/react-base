import React from 'react';

const Content = ({ match }) => (
  <div>
    <h5>content2222: 内容部分</h5>
    <div className="">type: {match.params.type}</div>
  </div>
);

export default Content;