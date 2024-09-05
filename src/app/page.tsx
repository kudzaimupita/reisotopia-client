import Container from "./components/Container/Container";
import styles from "./page.module.css";
import Hotels from "./pages/HotelListing/Hotels";

export default function Home() {
  return <main className={styles.main}><>
      <Container>
      <Hotels/>
    </Container>
  </></main>;
}
