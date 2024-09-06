"use client";

import Container from "./components/Container/Container";
import HotelsPage from "./pages/HotelListing/Container";

export default function Home() {
  return (
    <main>
      <Container>
        <HotelsPage />
      </Container>
    </main>
  );
}
