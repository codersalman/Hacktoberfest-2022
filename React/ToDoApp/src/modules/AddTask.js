import React from 'react'

class AddTask extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        task:""
      }
    }
    handleChange(e){
      this.setState({
        task:e.target.value
      });
      if(this.props.lastTask)
        this.props.lastTask(e.target.value);
    }
    render(){
      return(
        <div>
        {!this.props.tasks.length && "Entrez votre tâche ci-dessous et cliquez sur le bouton + pour l'ajouter :)"}
          {!this.props.toogleTaskList && 
          <ul className="list-group">{
            this.props.tasks.map(task =>
              <li key={`add${this.props.tasks.indexOf(task)}`} className="list-group-item">
                {task}
              </li>)
        }</ul>}
        <div className="input-group mb-2">
          <input 
            type="text" 
            name = "tasks"
            className="form-control" 
            aria-describedby="button-addon2"
            value={this.state.task} 
            onChange={this.handleChange.bind(this)}
          />
          <button 
            type="button" 
            className="btn btn-outline-success" 
            id="button-addon2" 
            onClick={() => {
              this.state.task && 
              this.props.tasks.indexOf(this.state.task) === -1&&
              this.props.onClick(this.state.task);
              this.setState({
                task:''
              });
            }
            }>
            <i className="bi bi-plus-square"/>
          </button>
        </div>
        </div>
      );
    }
  }

  export default AddTask;