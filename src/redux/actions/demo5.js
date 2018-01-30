import { getDetail } from '@/api/cnode.js';

//返回一个action对象，用来关联对应的reducer，将data保存到store。
const saveReducer = (data) => ({
  type: 'SAVE_REDUCER',
  data
});

// export const getPostDetail = (id) => async (dispatch, getState) => {
//   try {
//     const result = await getDetail(id);
//     await dispatch(saveReducer(result.data))
//   } catch (err) {
//     console.log(err);
//   }
// } 
export const getPostDetail = (id) => (dispatch, getState) => {
  getDetail(id)
    .then((result) => {
      console.log(result)
      dispatch(saveReducer(result.data))
    })
    .catch(err => console.log(err))
} 