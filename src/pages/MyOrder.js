import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./myOrder.css";
import { useSelector, useDispatch } from "react-redux";
import { myOrders } from "../actions/OrderAction";
import Loader from "../layout/Loader";
import { NavLink } from "react-router-dom";
import { useAlert } from "react-alert";
import Typography from "@material-ui/core/Typography";
import MetaData from "../layout/MetaData";
import LaunchIcon from "@material-ui/icons/Launch";


const MyOrder = () => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const { orders } = useSelector((state) => state.myOrders);
    const { user } = useSelector((state) => state.user);
    const [loading, setLoading] = useState(true);

    const columns = [
        { field: "id", headerName: "Order ID", minwidth: 300, flex: 1 },
        {
            field: "status",
            headerName: "Status",
            minwidth: 150,
            flex: 0.5,
            cellClassName: (params) => {
                return params.getValue(params.id, "status") === "Delivered"
                    ? "greenColor"
                    : "redColor"
            },
        },
        {
            field: "itemsQuantity",
            headerName: "Items Qty",
            type: "number",
            minwidth: 150,
            flex: 0.3,
        },
        {
            field: "amount",
            headerName: "Amount",
            type: "number",
            minwidth: 270,
            flex: 0.5
        },
        {
            field: "actions",
            flex: 0.3,
            headerName: "Actions",
            minwidth: 150,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <NavLink to={`/order/${params.getValue(params.id, "id")}`}>
                        <LaunchIcon />
                    </NavLink>
                );
            },
        },
    ];

    const rows = [];

    orders &&
        orders.forEach((item, index) => {
            rows.push({
                itemsQty: item.orderItems.length,
                id: item.id,
                status: item.orderStatus,
                amount: item.totalPrice
            });
        });

    useEffect(() => {
        dispatch(myOrders());
    }, [dispatch]);

    return (
        <Fragment>
            <MetaData title={`${user.name} - Orders`} />
            {loading ? (
                <Loader />
            ) : (
                <div className="myOrdersPage">
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        className="myOrdersTable"
                        autoHeight
                    />

                    <Typography id="myOrdersHeading">{user.name}'s Orders</Typography>
                </div>
            )}
        </Fragment>
    )
}

export default MyOrder;