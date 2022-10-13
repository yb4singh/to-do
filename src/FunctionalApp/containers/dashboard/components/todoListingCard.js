import Check from "../icons/check";
import Cross from "../icons/cross";

export default function TodoListingCard(props) {
    return (
        <div className={`to-do-listing-card ${props.data.completeStatus == true ? "complete":""}` }>
            <div className="content">
                <div className="title">{props.data.title}</div>
                <div className="description">{props.data.description}</div>
            </div>

            <div className="actions">
                <button className="action-read"  onClick={() => {props.markCompleteTodo(props.data.id)}}><Check className="action-read-logo"/></button>
                <button className="action-delete" onClick={()=> {props.deleteToDo(props.data.id)}}><Cross className="action-delete-logo"/></button>
            </div>

        </div>
    );
}