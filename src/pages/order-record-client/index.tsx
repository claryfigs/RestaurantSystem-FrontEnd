import './style.css'
import NavbarClient from '../../components/navbar-client/navbar-client'
import RecordCardClient from '../../components/record-card-client/record-card-client'

function OrderRecordClient() {

return (
    <div>
        <NavbarClient/>
        <div className='order-record-client'>
            <h1>Histórico de pedidos</h1>
            <h2>Seus pedidos antigos. Deixe avaliações para o restaurante</h2>
            <RecordCardClient/>
        </div>
    </div>
)
}

export default OrderRecordClient
