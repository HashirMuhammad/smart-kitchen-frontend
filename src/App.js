import MenuComponent from './Components/Menu'; 
import Signup from './Components/SignUp'; 
import Login from './Components/Login'; 
import AddMenuItem from './Components/AddMenuItem'; 
import UserList from './Components/UserList'; 
import Order from './Components/Order'; 
import OrderDetails from './Components/OrderDetails'; 
import FeedbackForm from './Components/FeedbackForm'; 
import RiderDetails from './Components/RiderDetails'; 
import OrdersList from './Components/OrdersList'; 



import './App.css';

function App() {
  return (
    <div className="w-screen h-auto flex flex-col bg-primary">

        {/* <MenuComponent /> */}
        {/* <Signup /> */}
        {/* <Login /> */}
        {/* <AddMenuItem /> */}
        {/* <UserList /> */}
        {/* <Order /> */}
        {/* <OrderDetails /> */}
        {/* <FeedbackForm /> */}
        {/* <RiderDetails /> */}
        <OrdersList />
      </div>
  );
}

export default App;
