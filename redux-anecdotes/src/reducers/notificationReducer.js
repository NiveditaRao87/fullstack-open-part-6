const notificationReducer = (state = '', action) => {
  switch(action.type){
  case 'SET_NOTIFICATION':
    return { message: action.message }
  case 'REMOVE_NOTIFICATION':
    return { message: null, timeoutId: null }
  case 'SAVE_TIMEOUTID':
    return { ...state, timeoutId: action.timeoutId }
  default:
    return state
  }
}

export const setNotification = (message,waitSeconds,pendingTimeout) => {
  return async dispatch => {
    await clearTimeout(pendingTimeout)
    dispatch({
      type:'SET_NOTIFICATION',
      message
    })
    const timeoutId = setTimeout(() => {
      dispatch({
        type:'REMOVE_NOTIFICATION'
      })
    }, waitSeconds*1000)
    dispatch({
      type: 'SAVE_TIMEOUTID',
      timeoutId
    })
  }
}

export default notificationReducer