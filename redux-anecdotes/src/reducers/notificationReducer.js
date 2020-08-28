const notificationReducer = (state = '', action) => {
    switch(action.type){
        case 'SET_NOTIFICATION':
            return action.message
        case 'REMOVE_NOTIFICATION':
            return null
        default:
            return state
    }
}

export const setNotification = (message,waitSeconds) => {
    return dispatch => {
        dispatch({
            type:'SET_NOTIFICATION',
            message
        })
        setTimeout(() => {
            dispatch({
                type:'REMOVE_NOTIFICATION'
            })
        }, waitSeconds*1000)
    }
}

export default notificationReducer