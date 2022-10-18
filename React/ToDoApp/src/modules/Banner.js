const Banner = (props) =>(
    <header>
      <div style={{display:"inline-block"}}>
        <h2>To do App📝</h2>
        <small>By Roméo Kakpo</small>
      </div>
          <button type="button" className="btn btn-dark pos" onClick={() => props.formClick()}>
              Nouvelle liste{" "}
            <i className="bi bi-plus-circle"/>
          </button>
    </header>
  );

  export default Banner;