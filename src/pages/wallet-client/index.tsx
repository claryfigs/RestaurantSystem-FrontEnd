import './style.css'
import { useState } from 'react';
import NavbarClient from '../../components/navbar-client/navbar-client'
import SelectPayment from '../../components/select-payment/select-payment'
import MoneyInput from '../../components/input-money/input-money';
import Button from '../../components/Button/Button';

function WalletClient() {

    const handleSelectChange = (value: string) => {
    console.log('Selecionado:', value);
  };

    const [value, setValue] = useState('00,00'); // começa com 00,00

return (
    <div>
        <NavbarClient/>
        <div className='wallet-client'>

            <h1>Carteira</h1>
            <h2>Use o saldo da carteira para fazer compras.</h2>

            <div className='wallet-client-balance'>
                <h1>Seu saldo:</h1>
                <p className='wallet-client-balance-text'>R$ 120,00</p>
            </div>

            <h1>Adicionar saldo:</h1>
            <h2>Escolha um método para adicionar saldo na carteira.</h2>
            
            <div className='wallet-client-space'>
                <SelectPayment onChange={handleSelectChange}/>
            </div>
            

            <h2>Quanto você deseja adicionar?</h2>

            <div className='wallet-client-space'>
                <div className='wallet-client-space2'>
                    <h1 className='wallet-client-space3'>R$</h1>
                    <MoneyInput value={value} onChange={setValue} placeholder="Digite o valor" />
                </div>
            </div>
            
            <div className='wallet-client-button'>
            <Button label="Gerar pagamento" variant="secondary"/>
            </div>

        </div>
    </div>
)
}

export default WalletClient
