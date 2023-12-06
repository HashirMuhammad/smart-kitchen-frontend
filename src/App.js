import MenuComponent from './Components/Menu'; 
import Signup from './Components/SignUp'; 
import Login from './Components/Login'; 
import AddMenuItem from './Components/AddMenuItem'; 
import UserList from './Components/UserList'; 
import Order from './Components/Order'; 



import './App.css';

function App() {
  return (
    <div className="w-screen h-auto flex flex-col bg-primary">

        {/* <MenuComponent /> */}
        {/* <Signup /> */}
        {/* <Login /> */}
        {/* <AddMenuItem /> */}
        {/* <UserList /> */}
        <Order />
      </div>
  );
}

export default App;
