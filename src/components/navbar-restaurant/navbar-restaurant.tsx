import './navbar-restaurant.css';
import SidebarRestaurant from '../sidebar-restaurant/sidebar-restaurant';

const NavbarRestaurant: React.FC = () => {

  return (
    <div className='navbar-box-restaurant'>
      <div className='navbar-sidebar-space-restaurant'><SidebarRestaurant/></div>
      <p className='navbar-title-restaurant'>Tô brocado</p>
    </div>
  );
};

export default NavbarRestaurant;