import { Outlet } from "react-router-dom";
import RestHeader from "./RestHeader";

function SecondaryHome(){
    return(
        <>
        <RestHeader/>
        <Outlet/>
        </>
    )
}
export default SecondaryHome;