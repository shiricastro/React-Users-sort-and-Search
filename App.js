import React, { Component } from 'react';
import{
	BrowserRouter as Router,
	Route
} from 'react-router-dom';
import Users from './Users';

export default class App extends Component {
  render() {
    return (
    	<Router>
	    	<div>
	    		<Route path="/users" component={Users} />
	    	</div>
    	</Router>

    );
  }
}


