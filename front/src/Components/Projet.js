import React, { Component } from 'react';
import { Card, CardBody, Button, CardTitle, CardText, CardImg, Progress } from 'reactstrap';
import {connect} from 'react-redux';


class Projet extends Component {

  constructor() {
   super();
   this.state = {
     isFav : false,
     textFav : <Button outline color="secondary" style={{cursor:'pointer'}} onClick={this.ToggleFavorite}>+ Favorite</Button>,
   };
 }

// clic sur le bouton favori
 ToggleFavorite = () => {
   if (this.state.isFav === false){
     var projectliked = {
       projectName: this.props.projectName,
       projectUrl: this.props.projectUrl,
       projectDesc: this.props.projectDesc,
       projectDaysSpent: this.props.projectDaysSpent,
       projectStackFront: this.props.projectStackFront,
       projectStackBack: this.props.projectStackBack
     }

     fetch('http://localhost:3000/projects/', {
       method: 'POST',
       headers: {'Content-Type':'application/x-www-form-urlencoded'},
       body: 'projectName='+this.props.projectName+'&projectUrl='+this.props.projectUrl+'&projectDesc='+this.props.projectDesc+'&projectDaysSpent='+this.props.projectDaysSpent+'&projectStackBack='+this.props.projectStackBack+'&projectStackFront='+this.props.projectStackFront
     })
     .then(function(response) {
        return response.json();
     })
     .then(function(data) {
     })
     .catch(function(error) {
        console.log('Request failed', error)
     });

     this.props.insertLikedProject("likedprojects",projectliked)
     this.setState({
       isFav : true,
       textFav : <Button color="secondary" style={{cursor:'pointer'}} onClick={this.ToggleFavorite}>- Favorite</Button>
     })
   }

   else{
     this.props.insertLikedProject("unlikedprojects",this.props.projectName)
     this.setState({
       isFav : false,
       textFav : <Button outline color="secondary" style={{cursor:'pointer'}} onClick={this.ToggleFavorite}>+ Favorite</Button>
     })

     fetch('http://localhost:3000/projects/'+this.props.projectName, {
       method: 'DELETE'
     })
     .then(function(response) {
        return response.json();
     })
     .then(function(data) {
     })
     .catch(function(error) {
        console.log('Request failed', error)
     });

   }
 }


  componentDidMount() {
    if(this.props.isFav){
      this.setState({
        textFav : <Button color="secondary" style={{cursor:'pointer'}} onClick={this.ToggleFavorite}>- Favorite</Button>,
        isFav : true
      })
    }
  }

  render() {

    return (
              <div className="col-12 col-md-6 col-lg-4">
                  <Card className='CardProject'>
                    <div className='headerCard'>
                      <CardImg width="100%" style={{width:'35%'}} src={this.props.projectUrl} alt={this.props.ProjectName} />
                    </div>
                      <CardBody className='CardStyle'>
                        <CardTitle style={{fontWeight:'bold'}}>{this.props.projectName}</CardTitle>

                        <CardText style={{marginBottom:'30px'}}>{this.props.projectDesc}</CardText>
                        <CardTitle style={{fontWeight:'bold'}}>Stack Front</CardTitle>
                        <CardText style={{textAlign:'center'}}>
                          {this.props.projectStackFront}
                        </CardText>
                        <CardTitle style={{fontWeight:'bold'}}>Stack Back</CardTitle>
                        <CardText>
                          {this.props.projectStackBack}
                        </CardText>
                        <CardTitle style={{fontWeight:'bold'}}>{this.props.projectDaysSpent}/5 days spent</CardTitle>
                        <div style={{marginRight:'20px', marginLeft:'20px', marginBottom:'20px'}}>
                          <Progress value={this.props.projectDaysSpent/5*100} color='secondary'/>
                        </div>
                        {this.state.textFav}
                      </CardBody>
                  </Card>
              </div>

    );
  }
}

// Envoi de Redux
function mapDispatchToProps(dispatch) {
  return {
    insertLikedProject  : function(type, likedproject) {
        dispatch( {type: type,
          likedproject: likedproject
        } )
    }
  }
}

export default  connect(
    null,
    mapDispatchToProps
)(Projet);
