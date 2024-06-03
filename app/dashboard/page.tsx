const Dashboard = async () => {
  const orders = await fetch("/api/orders", { method: "GET" });
  return <div>orders</div>;
};

export default Dashboard;
