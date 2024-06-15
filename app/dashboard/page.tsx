"use client";
import EventSeatIcon from "@mui/icons-material/EventSeat";
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
  const { token, setToken } = useContext(TokenContext);
  const [data, setData] = useState({ body: { reservations: [] } });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/user", {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
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
    <>
      <List
        className="animate__animated history animate__faster"
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
    </>
  );
};

export default Dashboard;
