/* c-node 的 api */
import fetch from '@/utils/react-fetch';

/**
 * 获取列表
 * @param {number} [page=1] 
 * @param {number} [limit=10] 
 * @returns 
 */
export function getList(page = 1, limit= 10) {
  // console.log('page', page, 'pageSize', pageSize);
  return fetch('/topics', {
    param: { page, limit }
  })
}
/**
 * 获取帖子详情
 * @export
 * @param {any} id 
 * @returns 
 */
export function getDetail(id) {
  // return fetch(`/topicddd/${id}`)
  return fetch(`/topic/${id}`)
}
/**
 * 发表新帖子
 * @export
 * @param {any} title 
 * @param {any} content 
 * @returns 
 */
export function createTopic(title, content) {
  return fetch('/topics', {
    method: 'POST',
    param: { title, content, tab: 'dev', accesstoken: '' }
  })
}

export function testError() {
  return fetch('https://www.easy-mock.com/mock/59a00642fc8bbd1f75082699/api/app/error')
}