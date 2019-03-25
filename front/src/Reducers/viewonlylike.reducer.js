export default function(viewonlylike=false, action) {



  if(action.type === 'All') {
    return false;

  } else if (action.type === 'Top'){
      return true;
    }
    else{
      return viewonlylike;
    }

}
