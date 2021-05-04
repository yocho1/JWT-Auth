import React from 'react'
import {Redirect, Route } from 'react-router-dom'

const AdminRoute = ({ component:Component, isAuth, role, ...rest}) => {
    return (
        <Route
        {...rest}
        render={() => ( 
            (isAuth && role === 'admin')
            ? <Component/> : <Redirect to="/signIn" />
        )}
        />
    )
}

const TechnicianRoute = ({component:Component,isAuth,role,...rest})=>(
    <Route
     {...rest}
     render={() => ( 
         (isAuth && role === 'technician' ) 
         ? <Component/> : <Redirect to="/signIn" /> 
    )}
/>
)

const UserRoute = ({component:Component,isAuth,role,...rest})=>(
    <Route
     {...rest}
    render={() => ( 
         (isAuth && role === 'user' ) 
         ? <Component/> : <Redirect to="/singIn" />
    )}
/>
)

const IsAuthenticate = ({component:Component,role,isAuth,...rest})=>(
    <Route
     {...rest}
     render={() => (
        !isAuth ? <Component/> 
                : (role === "admin" 
                  ? <Redirect to="/dashboard" />
                    : ( role === "technician"
                     ? <Redirect to="/technician" /> 
                     : <Redirect to="/profileUser" />)
         )

    )}
/>
)


export {AdminRoute, TechnicianRoute, UserRoute, IsAuthenticate }