"use client";
import { useContext, useEffect, useState } from "react";
import { TokenContext } from "../lib/contexts/tokenContext";
import { AlertContext } from "../lib/contexts/AlertContext";

const Dashboard = () => {
  const { openAlert } = useContext(AlertContext);
  const [data, setData] = useState({ body: { reservations: [] } });
  const { token } = useContext(TokenContext);
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
    <div>
      {data.body.reservations &&
        data.body.reservations.map((res) => <p key={res.id}>{res.date}</p>)}
    </div>
  );
};

export default Dashboard;
