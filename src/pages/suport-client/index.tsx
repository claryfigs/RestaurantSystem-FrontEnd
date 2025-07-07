import './style.css'
import NavbarClient from '../../components/navbar-client/navbar-client'

function SuportClient() {

return (
    <div>
        <NavbarClient/>
        <div className='order-record-client'>
            <h1>Suporte</h1>
            <h2>Precisa de ajuda? Veja algumas soluções de problemas.</h2>

            <h1>Como fazer um pedido?</h1>
            <h2>Acesse o restaurante desejado, adicione um item no carrinho. Use a aba do carrinho para finalizar a compra usando o saldo da conta.</h2>

            <h1>Como avaliar um restaurante?</h1>
            <h2>Acesse a aba “Histórico de pedidos” para visualizar os pedidos já feitos. Clique em “Avaliar pedido” para deixar um comentário e estrelas para o restaurante.</h2>

            <h1>Contato com administrador:</h1>
            <h2>Telefone: +55 85 99999-0000 | E-mail: tobrocado@uece.br</h2>
        </div>
    </div>
)
}

export default SuportClient
