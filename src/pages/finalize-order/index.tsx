import './style.css'
import { useState } from 'react';
import NavbarClient from '../../components/navbar-client/navbar-client'
import FinalizeOrderTable from '../../components/finalize-order-table/finalize-order-table'
import SelectLocal from '../../components/select-local/select-local'
import ButtonMap from '../../components/button-map/button-map'
import ObservationInput from '../../components/input-observation/input-observation'
import Button from '../../components/Button/Button';

function FinalizeOrder() {

  const handleSelectChange = (value: string) => {
    console.log('Selecionado:', value);
  };

  const [observation, setObservation] = useState('');

return (
    <div>
        <NavbarClient/>
        <div className='finalize-order'>
            <h1>Seu pedido</h1>
            <h2>Itens adicionados no seu carrinho:</h2>

            <FinalizeOrderTable/>

            <div className='finalize-order-balance-box'>
            <h1>Seu saldo:</h1>
            <p className='finalize-order-balance'>R$ 120,00</p>
            </div>
            
            <h2>• Ao finalizar a compra, o valor do pedido será descontado do saldo.</h2>
            <h2>• Você poderá cancelar o pedido e ser reenbolsado em até 3min.</h2>

            <h1>Selecione o local de entrega:</h1>
            <h2>Use o mapa para  selecionar em qual local da UECE você gostaria de receber o pedido:</h2>

            <div className='finalize-order-buttons'>
            <SelectLocal onChange={handleSelectChange}/>
            <ButtonMap/>
            </div>
            
            <h2>Deixe uma observação para o entregador:</h2>
            
            <div className='finalize-order-inputspace'>
            <ObservationInput
              value={observation}
              onChange={(e) => setObservation(e.target.value)}
              placeholder="Digite sua observação"
            />
            </div>

            <div className='finalize-order-buttonspace'>
            <Button label="Confirmar pedido" variant="secondary" />
            </div>

        </div>
    </div>
)
}

export default FinalizeOrder
