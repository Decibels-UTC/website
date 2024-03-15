import { useHref } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

function LoginButton() {

  function handleClick(){
      window.location.href = '/login';
  }

 return (
    <Button onClick={handleClick} color='green'>
      Login
    </Button>
 );
}

export default LoginButton;
