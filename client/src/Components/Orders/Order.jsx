import GetMyOrders from "./GetMyOrders";
import GetAllOrders from "./GetAllOrders"
import useAuth from "../../hooks/useAuth";

function Order() {

  const {username, permission, name, email, phone, isAdmin, isClient,isWorker,isShiftManager, _id}=useAuth()
    return (
      <div className="Order">
        <br/>
        Orders

       {permission=='client'? <GetMyOrders />:<GetAllOrders/>}
           
      </div>
    );
  }
  
  export default Order;