import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  switch (action.type){
  case 'NEW_ANECDOTE':
    return [...state, action.data]
  case 'INIT_ANECDOTES':
    return action.data
  case 'VOTE': {
    const id = action.data.id
    return state
      .map(anecdote => anecdote.id !== id ? anecdote : action.data)
  }
  default:
    return state
  }
}

export const initialiseAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    })
  }
}

export const upVote = anecdote => {
  return async dispatch => {
    anecdote.votes = anecdote.votes + 1
    const updatedAnecdote = await anecdoteService.update(anecdote)
    dispatch ({
      type: 'VOTE',
      data: updatedAnecdote
    })
  }
}

export default reducer