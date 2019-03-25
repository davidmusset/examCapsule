import React, { Component } from 'react';
import NavbarTop from './NavbarTop'
import Jumbotron from './Jumbotron'
import Projet from './Projet'
import Footer from './Footer'
import Alert from './Alert'
import {Badge} from 'reactstrap';
import {connect} from 'react-redux';


class Mainscreen extends Component {

  constructor() {
   super();
   this.state = {
     dataVisible : <p style={{color:'black', fontSize:'25px'}}> Chargement des projets...</p>,
   };
  }

  HandleClickLike = () => {

  }

// Montrer tout
  showAll =async () => {
    //on toggle la view
    await this.props.toggleViewOnlyLike("All");

    // on relance le contenu
    this.ShowContent()
  }

// Montrer seulement le top
  showTop =async () => {
    //on toggle la view
    await this.props.toggleViewOnlyLike("Top");

    // on relance le contenu
    this.ShowContent()
  }


  // Clic en haut
   ShowContent = () => {
    var projectsToDisplay = ""
    if(this.props.viewonlylike === false){
      projectsToDisplay = this.props.projectlist
    }
    else{
      projectsToDisplay = this.props.likedprojects
    }

    console.log(projectsToDisplay);

    var rendu = projectsToDisplay.map((project,i) =>{
      var isFav = false
      for (var w = 0; w<this.props.likedprojects.length; w++){
        if(project.projectName === this.props.likedprojects[w].projectName){
          isFav = true;
        }
      }
      //les badges front
      var stack_front = project.projectStackFront.map((stack,j) => {
        return <Badge key={j} color="secondary" style={{marginRight:'10px'}}>{stack}</Badge>
      });

      //les badges back
      var stack_back = project.projectStackBack.map((stack,j) => {
        return <Badge key={j} color="secondary" style={{marginRight:'10px'}}>{stack}</Badge>
      });

      //la carte globale
      return <Projet key={i} projectName={project.projectName} projectUrl={project.projectUrl} projectDesc={project.projectDesc} projectDaysSpent={project.projectDaysSpent} projectStackFront={stack_front} projectStackBack={stack_back} isFav={isFav}/>
    })


    if(rendu.length === 0){
      rendu = <p style={{color:'black', fontSize:'25px'}}> Aucun projet dans le TOP 3</p>
    }

    //on l'affiche
    this.setState({
      dataVisible : rendu
    });

  }




  // Recuperation des projets
    async componentDidMount() {

      var ctx = this;
      await fetch('http://localhost:3000/')
      .then(function(response) {
         return response.json();
      })
      .then(function(data) {
        console.log(data);
        var projectlist = data.projects.map(project => {
          return {
            projectName: project.name,
            projectUrl: project.pic_url,
            projectDesc: project.desc,
            projectDaysSpent: project.days_spent,
            projectStackFront: project.stack_front,
            projectStackBack: project.stack_back,
          }
        })
        ctx.props.insertProjects(projectlist);
      });

      // Recuperation des projets likés

      await fetch('http://localhost:3000/projects')
      .then(function(response) {
         return response.json();
      })
      .then(function(data) {
        ctx.props.insertLikedProject(data)
      });

      this.ShowContent();

    }



  render() {

    return (
      <div className = "Main">
        <NavbarTop showAll={this.showAll} showTop={this.showTop}/>
        <Jumbotron/>
        <div className = "Projet">
          <div className = "container">
            <div className="row">
              {this.state.dataVisible}
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}





// Envoi de Redux
function mapDispatchToProps(dispatch) {
  return {
    insertProjects  : function(projectlist) {
        dispatch( {type: 'projectlist',
          projectlist: projectlist
        } )
    },
    toggleViewOnlyLike : function(type){
      dispatch({type:type})
    },
    insertLikedProject : function(likedproject){
      dispatch({
        type:"AllLiked",
        likedproject : likedproject
      })
    }
  }
}

function mapStateToProps(state) {
  return {
    projectlist: state.projectlist,
    likedprojects : state.likedprojects,
    viewonlylike : state.viewonlylike
  }
}

export default  connect(
    mapStateToProps,
    mapDispatchToProps
)(Mainscreen);
