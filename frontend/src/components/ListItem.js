import React from 'react'
import { Link } from 'react-router-dom'

let getTitle = (note) => {
  let original_title = note.title
  if (original_title.length > 0){
    if (original_title.length > 25) {
      return original_title.slice(0, 45)
    }
    return original_title
  }
  else{
    let created_title = note.body.split('\n')[0]
    if (created_title.length > 25) {
      return created_title.slice(0, 45)
    }
    return created_title
  }
}

let getTime = (note) => {
  return new Date(note.updated).toLocaleString()
}

let getContent = (note) => {
  let content = note.body.split('\n')[0]
  if (content.length > 45) {
    return content.slice(0, 45) + '...'
  }
  return content
}

const ListItem = ({note}) => {
  return (
    <Link to={`note/${note.id}`}>
      <div className="notes-list-item">
        <h3>{getTitle(note)}</h3>
        <p>
          <span>
            {getTime(note)}
          </span>
          {getContent(note)}</p>
      </div>
    </Link>
  )
}

export default ListItem