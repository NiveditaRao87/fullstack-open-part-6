import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = props => {

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.createAnecdote(content)
    props.setNotification(`The list was updated with the anecdote '${content}'.`,10, props.timeoutId)
  }
  return (<div>
    <h2>create new</h2>
    <form onSubmit={addAnecdote}>
      <div><input name='anecdote' /></div>
      <button type='submit'>create</button>
    </form>
  </div>)
}

const ConnectedAnecdoteForm = connect(
  (state) => ( { timeoutId: state.notification.timeoutId } ),
  { createAnecdote, setNotification }
)(AnecdoteForm)
export default ConnectedAnecdoteForm