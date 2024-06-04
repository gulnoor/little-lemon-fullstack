import TokenProvider from "../lib/contexts/tokenContext";

const Dashboard = async () => {
  return (
    <TokenProvider>
      <div>gg</div>;
    </TokenProvider>
  );
};

export default Dashboard;
