import React, { Component } from 'react';
import { withAuth0 } from '@auth0/auth0-react';
// import { useAuth0 } from '@auth0/auth0-react';
export class LogButton extends Component {
    render() {
        
            const { user ,loginWithRedirect,isAuthenticated } = this.props.auth0;

// !isAuthenticated && (
        return (
            !isAuthenticated &&  (

                <button onClick={loginWithRedirect}>Log in</button>
            )


    
  ); 
           
        
    }
}

export default withAuth0(LogButton)
