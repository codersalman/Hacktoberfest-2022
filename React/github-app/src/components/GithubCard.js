import React,{useEffect, useState} from 'react';

const GithubCard = ({avatar_url, bio, followers, following, login, name, public_repos, created_at, location,blog,company,twitter_username, user }) => {
   const [repoData, setRepoData] = useState([])

   function getDate(createdDate){
     let extractedDate = createdDate.slice(0,10)

     let year = extractedDate.slice(0,4);
     let month = Number(extractedDate.slice(5,7));
     let date = extractedDate.slice(8,10);
     let monthsArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct','Nov','Dec']

     return `${date} ${monthsArr[month-1]} ${year}`
   }

   function getRepos(login) {
    fetch("https://api.github.com/users/"+ login + "/repos?sort=created")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setRepoData(data)
      });
    }

   useEffect(()=>{
        getRepos(login);
   },[login])

    return (
        <div className="output-container">
            <div className="image-container">
              <img src={avatar_url} alt="icon"/>
            </div>
            <div className="details-container">
              <div className="title">
                {name ? <h2>{name}</h2> : '--'}
                {created_at ? <p>{getDate(created_at)}</p> : '--'}
                <p></p>
              </div>
              {login ? <small>@{login}</small> : '--'}
              {bio ? <p className="bio">{bio}</p> : '--'}
              <div className="repoDetails">
                <div>
                  <p>Repos</p>
                  {public_repos>=0 ? <p>{public_repos}</p> : '--'}
                </div>
                <div>
                  <p>Followers</p>
                  {followers>=0 ? <p>{followers}</p> : '--'}
                </div>
                <div>
                  <p>Following</p>
                  {following>=0 ? <p>{following}</p> : '--'}
                </div>
              </div>
              <div className="links">
                  {location ? <p><ion-icon name="location-outline"></ion-icon> {location}</p> : <p><ion-icon name="location-outline"></ion-icon> {location} --</p>}
                  {twitter_username ? <p><ion-icon name="logo-twitter"></ion-icon> {twitter_username}</p> : <p><ion-icon name="logo-twitter"></ion-icon> {twitter_username} -- </p>}
                  {blog ? <p><ion-icon name="link-outline"></ion-icon> {blog}</p> : <p><ion-icon name="link-outline"></ion-icon> -- </p>}
                  {company ? <p><ion-icon name="briefcase-outline"></ion-icon> {company}</p>:  <p><ion-icon name="briefcase-outline"></ion-icon> -- </p>}
              </div>
              <div className="repos">
                    {repoData.slice(0,5).map((item) => {
                      return <p key={item.id}><a href={item.html_url}>{item.name}</a></p>
                    })}
              </div>
            </div>
        </div>
    )
}

export default GithubCard
