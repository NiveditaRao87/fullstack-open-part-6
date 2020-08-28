import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
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

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const filter = useSelector(state => state.filter)
    const anecdotes = useSelector(state => state.anecdotes).sort((a,b) => b.votes - a.votes)

    const filteredAnecdotes = filter ? 
            anecdotes
              .filter(anecdote => anecdote.content.toLowerCase()
              .includes(filter.toLowerCase())) 
            : anecdotes

    const handleVote = anecdote => {
        dispatch(upVote(anecdote))
        dispatch(setNotification(`you voted '${anecdote.content}'`, 10))

    }
    
    return (<div>
      {filteredAnecdotes
        .map(anecdote =>
          <Anecdote 
          key={anecdote.id} 
          anecdote={anecdote}
          onVote={() => handleVote(anecdote)} />
        )}
    </div>)
}

export default AnecdoteList