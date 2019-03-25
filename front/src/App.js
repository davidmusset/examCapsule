import React, { Component } from 'react';
import './App.css';
import Mainscreen from './Components/Mainscreen'

import projectlist from './Reducers/projects.reducer'; // importation du user
import likedprojects from './Reducers/likedprojects.reducer'; // importation du user
import viewonlylike from './Reducers/viewonlylike.reducer'; // importation du user

// MECANIQUE REDUX
import {Provider} from 'react-redux';  // importation du provider
import {createStore, combineReducers}  from 'redux'; // importation du reduceur
const store = createStore(combineReducers({projectlist, likedprojects, viewonlylike})); // Création du store
// MECANIQUE REDUX

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Mainscreen/>
        </div>
    </Provider>
    );
  }
}

export default App;
