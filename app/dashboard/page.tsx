"use client";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import React, { useContext, useEffect, useState } from "react";
import { TokenContext } from "../lib/contexts/tokenContext";
import { AlertContext } from "../lib/contexts/AlertContext";
import { useRouter } from "next/navigation";
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

const Dashboard = () => {
  const { openAlert } = useContext(AlertContext);
  const [data, setData] = useState({ body: { reservations: [] } });
  const { token, setToken } = useContext(TokenContext);
  const router = useRouter();
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
        openAlert(err);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <button
        className="
              bg-[var(--md-sys-color-primary)] 
              w-full
              min-h-[48px] 
              text-xl text-[var(--md-sys-color-on-primary)] 
              rounded-full  
              flex justify-center items-center 
              px-4 py-3"
        onClick={() => {
          setToken("");
          router.push("/login");
        }}
      >
        Log out
      </button>
      <List
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
