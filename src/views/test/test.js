/**
 * 测试
 */

// str 序列化
const fs = require('fs');
const path = require('path');

const formatStr = (str) => {
  const strArr = str.split('\r\n');
  const people = {}; // 人
  const movie = {}; // 电影
  strArr.forEach((el) => {
    const pep = el[0];
    const mov = el[1];
    if (!movie[mov]) {
      movie[mov] = pep;
    } else {
      movie[mov] = [pep, ...people[mov]];
    }
  });

  const peoples = Object.keys(people).sort((a, b) => a > b);
  const movies = Object.keys(movie).map((el) => movie[el]);
  // 遍历 movies
  const getNum = (str1, str2, obj) => {
    const filters = movies.map((list) => {
      return movies.indexOf(str1) > -1 && movies.indexOf(str2) > -1;
    });
    return filters.length;
  };
  console.log(peoples);
  console.log(movies);
  // 递归 people , 获取人员组合和电影数量
  const getRes = (arr, str, res) => {
    if (arr.length < 2) return;
    const result = arr.map((el, i) => {
      const num = getNum(str, el, movies);
      return `${str} ${el} ${num}`;
    });
    const newRes = [...result, ...res];
    return getRes(arr.slice(1), arr[0], newRes);
  }
  // 获取组合，电影数量结果
  const ret = getRes(peoples, '', []);
  // 比较
  return ret;
};

fs.readFile(path.resolve('./input.txt'), { encoding: "utf-8" }, function (err, res) {
  if (err) {
    console.log(err);
  } else {
    // console.log(res);
    const result = formatStr(res);
    console.log(result);
  }
});
