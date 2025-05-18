import './navbar-client.css';
import SidebarClient from '../sidebar-client/sidebar-client';
import CarClient from '../car-client/car-client';

const NavbarClient: React.FC = () => {

  return (
    <div className='navbar-box'>
      <div className='navbar-sidebar-space'><SidebarClient/></div>
      <p className='navbar-title'>Tô brocado</p>
      <div className='navbar-car-space'><CarClient/></div>
    </div>
  );
};

export default NavbarClient;