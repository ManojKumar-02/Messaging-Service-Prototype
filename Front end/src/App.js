// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import ChatList from './components/messaging/ChatList';
import Chat from './components/messaging/Chat';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/chats" component={ChatList} />
          <Route exact path="/chats/:userId" component={Chat} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
