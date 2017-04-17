import Login from '../views/Login';
import CreateAccount from '../views/CreateAccount';
import Tasks from '../views/Tasks';
import Expenses from '../views/Expenses';
import Reports from '../views/Reports';
import Profile from '../views/Profile';

/**
 * @function Routes
 * 
 * Routes to different components.
 * @param name
 * @param navigator
 * @returns <NewRoute />
 */

function Routes(props) {
  console.log('FIYIN got here!');
  switch (props.name) {
    case "Login":
      return (<Login navigator={props.navigator} />);
      break;

    case "CreateAccount":
      return (<CreateAccount navigator={props.navigator} />);
      break;

    case "Tasks":
      return (<Tasks navigator={props.navigator} />);
      break;

    case "Expenses":
      return (<Expenses navigator={props.navigator} />);
      break;

    case "Reports":
      return (<Reports navigator={props.navigator} />);
      break;

    case "Profile":
      return (<Profile navigator={props.navigator} />);
      break;
    }
}

export default Routes;
