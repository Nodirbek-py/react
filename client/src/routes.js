import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {AuthPage} from './pages/AuthPage'
import {CreatePage} from './pages/CreatePage'
import {LinksPage} from './pages/LinksPage'
import {DetailPage} from './pages/DetailPage'
export const useRoutes = isAuthenticated => {
    if(!isAuthenticated){
        return (
            <Switch>
                <Route path="/" component={AuthPage} exact />
                <Route path="/links" component={LinksPage} exact/>
                <Route path="/create" component={CreatePage} exact/>
                <Route path="/detail/:id" component={DetailPage} />
                <Redirect to="/create"/>
            </Switch>
        )
    }
    // return (
    //     <Switch>
    //         <Route path="/" exec>
    //             <AuthPage />
    //         </Route>
    //         <Redirect to="/"/>
    //     </Switch>
    // )
}