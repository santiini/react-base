/* eslint-disable react/jsx-no-bind,no-unused-vars */
import React from 'react';
import { Spin } from 'antd';

const Loading = (props) => (
  <div className="">
    <Spin />
  </div>
);

const MyLoading = (props) => {
  console.log(props);
  // Handle the loading state
  if (props.isLoading) {
    return (
      <div>
        <Spin />
      </div>
    );
  }
  // Handle the error state
  else if (props.error) {
    return <div>Sorry, there was a problem loading the page.</div>;
  }
  else {
    return null;
  }
};

const LoadingCom = ({ error, isLoading, pastDelay, retry, timedOut }) => {
  if (error) {
    return <div>Error! <button onClick={retry}>Retry</button></div>;
  } else if (timedOut) {
    return <div>Taking a long time... <button onClick={retry}>Retry</button></div>;
  } else if (pastDelay) {
    return <div><Spin /></div>;
  } else {
    return null;
  }
};

export default MyLoading;
