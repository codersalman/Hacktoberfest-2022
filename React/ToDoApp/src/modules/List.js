import React,{useState} from "react"
import AddTask from "./AddTask";

function ButtonTrash(props){
    return(
    <button type="button" className="btn btn-outline-danger" title="Supprimer une tâche">
      <i className="bi bi-trash"/>
    </button>
    );
  }  
function Task(props){
  const [statut, setStatut] = useState(props.content.status);
  return(
    <React.Fragment>
      <input id={`${props.id}-${props.tasks.indexOf(props.content)}`} 
        className="form-check-input me-2" 
        type = "checkbox"
        checked={statut}
        onChange={(e) =>{
          setStatut(e.target.checked);
          props.onTaskStatusChange(props.listIndex,props.taskIndex,e.target.checked);
        }}
      />
      <label htmlFor={`${props.id}-${props.tasks.indexOf(props.content)}`}>{props.content.content}</label>
      <i className="bi bi-trash task-trash"
        onClick={() => props.onDelTask(props.listIndex,props.taskIndex)}
      />
    </React.Fragment>
  )
}

function Tasks(props){ 
    return (props.tasks.map( (task,taskIndex) =>
        <li key={`add${props.tasks.indexOf(task)}`} className="list-group-item">
          <Task content={task} 
            id={props.id}
            listIndex={props.listIndex}
            taskIndex={taskIndex}
            onDelTask = {props.onDelTask}
            onTaskStatusChange={props.onTaskStatusChange}
            tasks={props.tasks}
          />
        </li>));
  }

class List extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        isToogle:true,
      };
    }
    handleClick(){
      this.setState(state => ({
        isToogle:!state.isToogle
      }));
    }
    render(){
      return(
        <React.Fragment>
          <div>
            <ul className="list-group">
              <li className="list-group-item listTitle" onClick={this.handleClick.bind(this)}>
                <div style={{display:"inline-block"}}>
                  <h3>{this.props.listofTask.name}{" "}
                  {this.props.listofTask.status ?
                    <i style={{color: "lime"}} className ="bi bi-check-square-fill" />
                  :null}
                  </h3>
                  <small>{this.props.listofTask.date}</small>
                </div>
                <div className="buttonTrash" onClick={() => this.props.onTrash(this.props.i)}>
                  <ButtonTrash/>
                </div>
              </li>
              {!this.state.isToogle &&
                <React.Fragment>
                  <Tasks tasks={this.props.listofTask.tasks} 
                    id={this.props.id}
                    listIndex={this.props.i} 
                    onDelTask = {this.props.onDelTask}
                    onTaskStatusChange={this.props.onTaskStatusChange}
                  />
                  <li className="list-group-item">
                    <AddTask tasks={this.props.listofTask.tasks.map(task => task.content)} 
                      onClick={(task) => this.props.onUpdate(this.props.i,task)}
                      toogleTaskList = {true}
                    />
                  </li>
                </React.Fragment>
              }
            </ul>
          </div>
          <hr/>
        </React.Fragment>
      );
    }
  }

  export default List;