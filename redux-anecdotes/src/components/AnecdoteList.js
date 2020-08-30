import React from 'react'
import { connect } from 'react-redux'
import { upVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, onVote }) => {
  return (
    <>
      <div>
        {anecdote.content}
      </div>
      <div>
            has {anecdote.votes}
        <button onClick={onVote}>vote</button>
      </div>
    </>
  )
}

const AnecdoteList = props => {

  const handleVote = anecdote => {
    props.upVote(anecdote)
    props.setNotification(`you voted '${anecdote.content}'`, 10, props.timeoutId)

  }

  return (<div>
    {props.anecdotes
      .map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          onVote={() => handleVote(anecdote)} />
      )}
  </div>)
}

const mapStateToProps = state => {
  const sortedAnecdotes = state.anecdotes.sort((a,b) => b.votes - a.votes)
  return {
    anecdotes: state.filter
      ? sortedAnecdotes
        .filter(anecdote => anecdote.content.toLowerCase()
          .includes(state.filter.toLowerCase()))
      : sortedAnecdotes,
    timeoutId: state.notification.timeoutId
  }
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  { upVote, setNotification }
)(AnecdoteList)
export default ConnectedAnecdoteList