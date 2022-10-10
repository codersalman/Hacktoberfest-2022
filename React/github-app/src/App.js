import React, {useState, useEffect} from 'react';
import './App.css'
import GithubCard from './components/GithubCard.js'

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [user, setUser] = useState('bradtraversy');
  const [githubData, setGithubData] = useState({});

  const getGithubInfo = async () => {
     try{
       if(user){
         const res = await fetch('https://api.github.com/users/'+user);
         const data = await res.json();
         //console.log(data);
         const {avatar_url, bio, followers, following, login, name, public_repos,created_at, location,blog,company,twitter_username } = data;
         const githubObj = {avatar_url, bio, followers, following, login, name, public_repos, created_at,location,blog,company,twitter_username };
         setGithubData(githubObj);
         setLoading(false);
         setError(false);
       }
       else{
         setError(true)
         setLoading(false);
       }
     }
     catch(err){
       console.log(err);
       setGithubData(err.message);
       setLoading(false);

     }
  }

  useEffect(() => {
    getGithubInfo();
  }, [])

  return (
    <div className="container">
      <div className="input-container">
        <input type="text" placeholder="Search GitHub username..." value={user} onChange={(e)=> setUser(e.target.value)}/>
        <button className="Search" onClick={getGithubInfo}>Search</button>
      </div>
      {error ? "Please enter username" : loading ? "...Loading" : <GithubCard {...githubData} user={user}/> }

    </div>
  );
}

export default App;
