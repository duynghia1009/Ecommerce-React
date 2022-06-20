import React from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import "./orderSuccess.css";
import { Typography } from "@material-ui/core";
import { NavLink } from "react-router-dom";

const OrderSuccess = () => {
    return (
        <div className="orderSuccess">
            <CheckCircleIcon />
            <Typography>Your Order has been Placed Successfully</Typography>
            <NavLink to="/orders">View Order</NavLink>
        </div>
    );
};

export default OrderSuccess;