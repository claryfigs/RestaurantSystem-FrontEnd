import './style.css'
import NavbarRestaurant from '../../components/navbar-restaurant/navbar-restaurant'
import RecordCardRestaurant from '../../components/record-card-restaurant/record-card-restaurant'

function OrderRecordRestaurant() {

return (
    <div>
        <NavbarRestaurant/>
        <div className='order-record-client'>
            <h1>Histórico de pedidos</h1>
            <h2>Pedidos antigos do seu restaurante. Visualize as avaliações dos seus clientes em pedidos entregues.</h2>
            <RecordCardRestaurant/>
        </div>
    </div>
)
}

export default OrderRecordRestaurant
