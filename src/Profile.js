import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function Profile() {
  const { user } = useAuth0();

  return <div>
      <h1>
      Hello {user.name}

      </h1>
      <h4>
          {user.email}
      </h4>
      <img src={user.picture} alt='pic'></img>
  
  </div>;
}

export default Profile;