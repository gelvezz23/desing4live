import { CreateCompany } from "../../components/CreateCompany";
import Navbar from "../../components/Navbar";
import ListCompany from "../../components/ListCompany";
import "./dashboard.scss";
const Dashboard = () => {
  return (
    <>
      <Navbar />
      <section className="container-dashboard">
        <CreateCompany />
        <ListCompany />
      </section>
    </>
  );
};

export default Dashboard;
