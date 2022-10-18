import React, {Fragment} from 'react';
import Banner from "./modules/Banner"
import TaskListManager from './modules/TaskListManager';
import FormControl from './modules/FormControl';
import './style/App.css'

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      formActive:false,
      data:[],
    }
  }
  setListStatus = (data, ListIndex) => {
    if(data[ListIndex].tasks.every(task => task.status)){
      data[ListIndex].status = true;
    }
    else
      data[ListIndex].status = false;
  }
  //Dès que l'élément se crée dans le DOM
  componentDidMount(){
      this.loadData();
  }
  //Avant la mise à jour de l'élément
  shouldComponentUpdate(nextProps, nextState) {
    localStorage.setItem('todoAppList', JSON.stringify(nextState.data));
    return true;
  }
  loadData(){
    let localData;
    try {
      localData = JSON.parse(localStorage.getItem('todoAppList')); 
    } catch (e) {
    }
    this.setState({
        data:localData?localData.sort((i1,i2) => i1.status-i2.status):[],
    });
  }

  handleFormStatus(){
    this.setState(state => ({
      formActive:!state.formActive
    }));
  }

  handleSubmitNewList(list,e){
    
    let newComers = {
      name:list.name,
      date:list.date,
      tasks:list.tasks.map(task => ({content:task, status:false})),
      id:(this.state.data.length)?Math.max(...this.state.data.map(item => item.id))+1:1,
      status:false
    }
    this.setState(state => ({
      formActive:!state.formActive,
      data: [newComers,...state.data]
    }));
    e.preventDefault();
  }

  handleTrashList(i){
    let data = this.state.data.slice();
    data.splice(i,1);
    this.setState({
      data:data
    });
  }
  //Ajout d'une tâche
  handleUpdateDataTask(i,task){
    let data = this.state.data.slice();
    data[i].tasks.push({content:task, status:false});
    this.setListStatus(data,i);
    this.setState({
      data:data
    });
  }
  //Supprimer une tache d'une liste
  handleTrashTask(ListIndex, taskIndex){
    let data = this.state.data.slice();
    data[ListIndex].tasks.splice(taskIndex,1);
    this.setListStatus(data,ListIndex);
    this.setState({
      data:data
    });
  }
  //Changer le status d'une tâche
  handleTaskStatusChange(ListIndex, taskIndex,status){
    let data = this.state.data.slice();
    data[ListIndex].tasks[taskIndex].status = status;
    //Verifier si toutes les tâches sont faites
    this.setListStatus(data,ListIndex);
    this.setState({
      data:data
    });
  }
  render(){
    return(
      <Fragment>
        <Banner formClick={this.handleFormStatus.bind(this)}/>
        <div className="contenu">
          {this.state.formActive && 
            <FormControl submitNewList={this.handleSubmitNewList.bind(this)}/>
          }
          <TaskListManager data = {this.state.data}
            onUpdate={this.handleUpdateDataTask.bind(this)}
            onTrash={this.handleTrashList.bind(this)}
            onDelTask = {this.handleTrashTask.bind(this)}
            onTaskStatusChange={this.handleTaskStatusChange.bind(this)}
          />
        </div>
      </Fragment> 
      );
  }
}

export default App;
