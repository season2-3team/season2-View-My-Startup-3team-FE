import { Outlet } from 'react-router-dom';
import Nav from './Nav/Nav.js';

export default function App() {
  return (
    <>
      <Nav />
      <div style={{ margin: '1.6rem' }}>
        <Outlet />
      </div>
    </>
  );
}
