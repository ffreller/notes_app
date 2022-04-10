import React, {useState, useEffect} from 'react'
import { useParams, useNavigate} from "react-router-dom"
import { ReactComponent as ArrowLeftIcon } from '../assets/arrow-left.svg'

function NotePage({ }) {
    let params = useParams();
    let navigate = useNavigate();

    const bodyStyle = {
        backgroundColor: "var(--color-white)",
        border: 'none',
        padding: '16px 12px',
        width: '100%',
        height: '70vh',
        resize: 'none',
        scrollbarWidth: 'none',
    };

    const titleStyle = {
        fontSize: 'xx-large',
        backgroundColor: "var(--color-white)",
        border: 'none',
        padding: '16px 12px',
        width: '100%',
        height: '7vh',
        resize: 'none',
        scrollbarWidth: 'none',
        fontWeight: 'bolder',
    };

    let note_id = params.id
    let [note, set_note] = useState(null)

    useEffect(() => {
        get_note()
    },[note_id])
    
    let get_note = async () => {
        if (note_id === 'new') return
        let response = await fetch(`http://127.0.0.1:7000/api/notes/${note_id}`)
        let data = await response.json()
        set_note(data)	
    }

    let create_note = async () => {
        await fetch('http://127.0.0.1:7000/api/notes/', {
                method:"POST",
                headers:{
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(note)
        })  
    }

    let update_note = async () => {
        await fetch(`http://127.0.0.1:7000/api/notes/${note_id}`, {
                method:"PUT",
                headers:{
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(note)
        })  
    }

    let delete_note = async () => {
        await fetch(`http://127.0.0.1:7000/api/notes/${note_id}`, {
                method:"DELETE",
                headers:{
                    'Content-Type': 'application/json'
                },
        })
        navigate('/')                        
    }

    let handle_submit = () => {
        if (note_id !== 'new' && note.body === '' && note.title  === ''){
            delete_note()
        }else if (note_id !== 'new'){
            update_note()
        } else if(note_id === 'new' && note !== null){
            create_note()
        }
        navigate('/')
    }


    return (
        <div className='note'>
            <div className='note-header'>
                <h3>
                    <ArrowLeftIcon onClick={handle_submit}/>
                </h3>
                {note_id !== 'new' ? (
                    <button onClick={delete_note}>Apagar</button>
                ) : (
                    <button onClick={handle_submit}>Save</button>
                )}
                
            </div>
            <h1>
                <textarea onKeyPress={e => {
                    if(e.key === 'Enter')
                        e.preventDefault()
                    }} placeholder="Title" style={titleStyle} onChange={
                    (e) => {set_note({
                    ...note, 'title': e.target.value
                    })} } value={note?.title}>
                </textarea>
            </h1>
            <textarea style={bodyStyle} placeholder="Body" id='textarea1'onChange={
                (e) => {set_note({
                   ...note, 'body': e.target.value
                })} } value={note?.body}>
            </textarea>
        </div>
    )
    }

export default NotePage


