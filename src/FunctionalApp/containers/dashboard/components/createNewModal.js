import { Fragment, useState } from "react"
import Cross from "../icons/cross"
export default function CreateNewModal(props) {
    const [title, setTitle] = useState(null);
    const [description, setDescription] = useState(null);

    const saveToDo = () => {
        if ( !title || title == '') return alert("Title can't be blank.")
        if( !description || description == '') return alert("Description can't be blank.")
        props.toggleCreateNewModal();
        props.saveToDo({title, description})
    }
    return (
        <Fragment>
            <div className="create-to-do-modal">
                <div className="modal-header">
                    <button onClick={props.toggleCreateNewModal}><Cross /></button>
                </div>
                <div className="modal-content">
                    <input type='text' onChange={(e) => {setTitle(e.target.value)}} value={title} placeholder="Title"/>
                    <textarea type='text' onChange={(e) => {setDescription(e.target.value)}} value={description} rows={6} placeholder="Description"></textarea>
                    <button type="button" onClick={() => {saveToDo(title)}} >Save</button>
                </div>
            </div>
            <div className="bg-overlay"></div>
        </Fragment>
    )
}