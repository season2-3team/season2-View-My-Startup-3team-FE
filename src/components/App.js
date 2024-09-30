import { Outlet } from 'react-router-dom';
import Nav from './Nav/Nav.js';

export default function App() {
  return (
    <>
      <Nav />
      <div>
        <Outlet />
      </div>
    </>
  );
}
