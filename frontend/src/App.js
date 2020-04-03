import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { useSelector } from 'react-redux';
import RegisterForm from "./containers/RegisterForm/RegisterForm";
import LoginForm from "./containers/LoginForm/LoginForm";
import Chat from "./containers/Chat/Chat";

const ProtectedRoute = ({isAllowed, ...props}) => (
  isAllowed ? <Route {...props}/> : <Redirect to='/login'/>
);

const App = () => {
  const user = useSelector(state => state.users.user);
  return (
    <Switch>
      <ProtectedRoute isAllowed={user} path="/" exact component={Chat} />
      <Route path="/login" component={ LoginForm } />
      <Route path="/register" component={RegisterForm} />
      <Route render={() => <h1>Not found</h1>} />
    </Switch>
  );
};

export default App;
