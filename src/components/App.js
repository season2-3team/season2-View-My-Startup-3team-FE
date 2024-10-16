import { Outlet } from 'react-router-dom';
import Nav from './Nav/Nav.js';
import Container from './Container.js';
import Footer from './Footer/Footer.js';

export default function App() {
  return (
    <>
      <Nav />
      <Container>
        <Outlet />
      </Container>
      <Footer />
    </>
  );
}
