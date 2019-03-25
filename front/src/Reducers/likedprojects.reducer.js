export default function(likedprojects=[], action) {

  var likedprojectsCopy = [...likedprojects]

  if(action.type === 'likedprojects') {
    likedprojectsCopy.push(action.likedproject)
    return likedprojectsCopy;

  } else if (action.type === 'unlikedprojects'){
    for (var i=0; i<likedprojectsCopy.length;i++){

      if(likedprojectsCopy[i].projectName === action.likedproject){
        likedprojectsCopy.splice(i,1)
      }
    }
    return likedprojectsCopy

    }
    else if (action.type === "AllLiked"){

      for(var i=0; i<action.likedproject.length; i++){
        likedprojectsCopy.push(
          {
            projectName: action.likedproject[i].projectName,
            projectUrl: action.likedproject[i].projectUrl,
            projectDesc: action.likedproject[i].projectDesc,
            projectDaysSpent: action.likedproject[i].projectDaysSpent,
            projectStackFront: action.likedproject[i].projectStackFront,
            projectStackBack: action.likedproject[i].projectStackBack,
          }
        )
      }
      return likedprojectsCopy;
    }
    else{
      return likedprojectsCopy;
    }

}
