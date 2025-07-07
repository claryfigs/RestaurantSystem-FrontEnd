import './style.css'
import NavbarRestaurant from '../../components/navbar-restaurant/navbar-restaurant'

function SuportRestaurant() {

return (
    <div>
        <NavbarRestaurant/>
        <div className='order-record-client'>
            <h1>Suporte</h1>
            <h2>Precisa de ajuda? Veja algumas soluções de problemas.</h2>

            <h1>Como editar o perfil do restaurante?</h1>
            <h2>Acesse a aba “Perfil” clicando no menu lateral. No seu perfil, clice no botão "Editar Perfil" para alterar suas informações.</h2>

            <h1>Como visualizar os pedidos pendentes?</h1>
            <h2>Acesse a aba “Pedidos em aberto” para visualziar os pedidos pendentes do restaurante. Atualize o status do pedido conforme a produção.</h2>

            <h1>Contato com administrador:</h1>
            <h2>Telefone: +55 85 99999-0000 | E-mail: tobrocado@uece.br</h2>
        </div>
    </div>
)
}

export default SuportRestaurant
