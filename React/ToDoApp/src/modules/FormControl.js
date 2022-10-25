import React from "react";
import AddTask from "./AddTask";

class FormControl extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        name:"",
        date:`${new Date().getFullYear()}-${((((new Date().getMonth()+1)+'').length === 1)?
          "0"+(new Date().getMonth()+1): (new Date().getMonth()+1))}-${((((new Date().getDate())+'').length === 1)?
            "0"+(new Date().getDate()): (new Date().getDate()))}`,
        status:false,
        tasks:[],
        error:[false,false]
      };
    }
    handleLastTaskAdd(task){
      this.lastTask = task;
    }
    handleChange(e){
      this.setState({
        [e.target.name]:e.target.value
      })
    }
    handleAddTask(task){
      let tasks = [...this.state.tasks, task];
      this.setState({
        tasks:tasks
      });
    }
    handleSubmit(e){
      /*Ajouter le dernière élément resté dans le formulaire,
      On modfie directement l'état car le changement n'altère pas sur
      le rendu*/
      if(this.lastTask !==undefined &&  !this.state.tasks.includes(this.lastTask)){
        this.state.tasks.push(this.lastTask);
	  }
      let error = [false, false];
      //Vérification des données
      if(!this.state.name){
        error[0] = true;
      }
      if(/^\d{4}-\d{2}-\d{2}$/.test(this.state.date)===false) error[1] = true;
      if(error[0]===false && error[1]===false){
        return this.props.submitNewList(this.state,e);
      }
      this.setState({
        error:error
      });
      e.preventDefault();
      return ;
    }
    render(){
      return(
        <div className="container form" style={{border:"1px solid #c6c6c6"}}>
              <form onSubmit={this.handleSubmit.bind(this)}>
                <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Nom de la liste</label>
                  {this.state.error[0] && <span className="text-danger"><br/>Nom obligatoire !</span>}
                <input 
                  name="name"
                  type="text" 
                  className="form-control"
                  id="exampleFormControlInput1" 
                  value = {this.state.name}
                  onChange={this.handleChange.bind(this)}
                />
              </div>
  
              <div className="mb-3">
                <label htmlFor="exampleFormControlInput2" className="form-label">Définir la date</label>
                {this.state.error[1] && <span className="text-danger"><br/>Date Invalide !</span>}
                <input 
                  name="date"
                  type="date" 
                  className="form-control" 
                  id="exampleFormControlInput2"
                  value = {this.state.date}
                  onChange={this.handleChange.bind(this)}
                />
              </div>
  
              <AddTask 
                tasks={this.state.tasks} 
                onClick={this.handleAddTask.bind(this)}
                lastTask={this.handleLastTaskAdd.bind(this)}
              />
  
              <button type="submit" className="btn btn-success mb-2">
                Ajouter{" "}
              </button>
              </form>
        </div>    
      );
  
    }
  
  }

  export default FormControl;
  