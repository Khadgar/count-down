import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import CountDownComponent from './components/CountDownComponent'
import './styles/app.css'; 

class App extends Component {
  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <React.Fragment>
        <div className="App">
          <Switch>
            <Route path="/:untilTimestamp" component={CountDownComponent} />
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
