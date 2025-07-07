import './style.css'
import NavbarRestaurant from '../../components/navbar-restaurant/navbar-restaurant';
import OrderCardRestaurant from '../../components/order-card-restaurant/order-card-restaurant';

function TrackOrderRestaurant() {

return (
    <div>
        <NavbarRestaurant/>
        <div className='track-order-restaurant'>
            <h1>Pedidos em aberto</h1>
            <h2>Pedidos em aberto do seu restaurante. Use os status para atualizar o cliente sobre o status do pedido.</h2>
            <OrderCardRestaurant/>
        </div>
    </div>
)
}

export default TrackOrderRestaurant;