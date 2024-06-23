"use client";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import Ordericon from "@mui/icons-material/RestaurantMenu";
import React, { useContext, useEffect, useState } from "react";
import { TokenContext } from "../lib/contexts/tokenContext";
import { AlertContext } from "../lib/contexts/AlertContext";
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import errorParser from "../lib/clientErrorHandler";

const Dashboard = () => {
  const { openAlert } = useContext(AlertContext);
  const { token } = useContext(TokenContext);
  const [data, setData] = useState({ body: { reservations: [], orders: [] } });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/user", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: "{}",
        });
        const data = await response.json();
        console.log(data);
        if (data.type === "success") {
          setData(data);
          return;
        }
        openAlert(data);
      } catch (err) {
        openAlert(errorParser(err));
      }
    };
    fetchData();
  }, []);
  return (
    <div className="flex flex-wrap justify-between">
      <List
        className="w-[49%]"
        sx={{
          borderRadius: "16px",
          bgcolor: "var(--md-sys-color-surface-container)",
        }}
      >
        {data.body.reservations &&
          data.body.reservations.map((res) => (
            <>
              <ListItem key={res.id}>
                <ListItemIcon>
                  <EventSeatIcon />
                </ListItemIcon>
                <ListItemText
                  primary={new Date(res.date).toDateString()}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {"Persons - "}
                      </Typography>
                      {res.persons}
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {"        Time -  "}
                      </Typography>
                      {res.time}
                    </React.Fragment>
                  }
                ></ListItemText>
              </ListItem>
              <Divider variant="middle" component="li" />
            </>
          ))}
      </List>
      <List
        className="w-[49%]"
        sx={{
          borderRadius: "16px",
          bgcolor: "var(--md-sys-color-surface-container)",
        }}
      >
        {data.body.orders &&
          data.body.orders.map((order) => (
            <>
              <ListItem key={order.id}>
                <ListItemIcon>
                  <Ordericon />
                </ListItemIcon>
                <ListItemText
                  primary={order.paymentStatus}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {"Persons - "}
                      </Typography>
                      {order.persons}
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {"        Time -  "}
                      </Typography>
                      {order.time}
                    </React.Fragment>
                  }
                ></ListItemText>
              </ListItem>
              <Divider variant="middle" component="li" />
            </>
          ))}
      </List>
    </div>
  );
};

export default Dashboard;
