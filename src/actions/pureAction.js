/**
 * 对应每一个 reducer 字段, 用 Request, Success, Fail 拆分 actions
 */
// 字母的大小写转换
const toUpper = (str) => {
  if (typeof str !== 'string') {
    throw new Error('params str must be String');
  }
  return str.toLocaleUpperCase();
};

// 请求开始
export const Request = (resource, operation) => ({
  type: `${toUpper(operation)}_${toUpper(resource)}_REQUEST`,
});

// 请求成功
export const Success = (data, resource, operation) => ({
  type: `${toUpper(operation)}_${toUpper(resource)}_SUCCESS`,
  payload: {
    data,
  },
});

// 请求失败
export const Failure = (error, resource, operation) => ({
  type: `${toUpper(operation)}_${toUpper(resource)}_FAILURE`,
  payload: {
    error,
  },
});
