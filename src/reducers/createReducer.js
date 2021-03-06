/**
 * reducer 的拆分: createReducer
 */

export default (initialState, handlers) => (state = initialState, action) => {
  if (handlers.hasOwnProperty(action.type)) {
    return handlers[action.type](state, action);
  }
  return state;
}