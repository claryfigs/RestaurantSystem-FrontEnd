import './style.css'
import NavbarClient from '../../components/navbar-client/navbar-client'
import OrderCardClient from '../../components/order-card-client/order-card-client';

function TrackOrderClient() {

return (
    <div>
        <NavbarClient/>
        <div className='track-order-client'>
            <h1>Pedidos em aberto</h1>
            <h2>Suas compras ativas no momento:</h2>
            <OrderCardClient/>
        </div>
    </div>
)
}

export default TrackOrderClient;
