import List from "./List"

function TaskListManager (props){
    const tabList = [];
    if(props.data.length){
      props.data.forEach((listofTask,i) => {
        tabList.push(
        <List key={`${listofTask.id}`} 
          listofTask={listofTask} 
          id={listofTask.id}
          onTrash = {props.onTrash}
          onUpdate = {props.onUpdate}
          onDelTask = {props.onDelTask}
          onTaskStatusChange={props.onTaskStatusChange}
          i = {i}
        />);
      });
    }
    if(!props.data.length)
     return <div className="container text-primary" >Pas de liste pour le moment :)</div>;
    return <div className="container">{tabList}</div>;
  }

  export default TaskListManager;
