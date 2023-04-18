import { DashboardNav } from "./Nav/DashboardNav";
import styles from "./Dashboard.module.css";
import NavbarPhone from "../../phone/navBarPhone/navBarPhone";

export const Dashboard = () => {
  return (
    <section className={styles.container}>
      <DashboardNav />
    </section>
  );
};
