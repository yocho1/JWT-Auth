import React, { useContext } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import LogIn from '../component/LogIn'
import ProfilProtected from '../component/ProfilProtected'
import {
  AdminRoute,
  TechnicianRoute,
  UserRoute,
  IsAuthenticate,
} from './ProtectedRoute'
import { UserContext } from '../UserContext'

const Routes = () => {
  const { isAuth, role } = useContext(UserContext)
  return (
    <Router>
      <Switch>
        <Route path='/' component={LogIn} exact />

        <AdminRoute
          path='/admin-Protected/:id'
          component={ProfilProtected}
          role={role}
          isAuth={isAuth}
          exact
        />
      </Switch>
    </Router>
  )
}

export default Routes
