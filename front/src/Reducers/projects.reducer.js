export default function(projectlist=[], action) {

  var projectlistCopy = [...projectlist]
  if(action.type === 'projectlist') {

    projectlistCopy = action.projectlist
    console.log(projectlistCopy);
    return projectlistCopy;

  } else {
      return projectlistCopy;
    }

}
