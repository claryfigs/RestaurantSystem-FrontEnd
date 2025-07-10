import './style.css';
import { useState, useEffect } from 'react';
import NavbarClient from '../../components/navbar-client/navbar-client';
import FinalizeOrderTable from '../../components/finalize-order-table/finalize-order-table';
import SelectLocal from '../../components/select-local/select-local';
import ButtonMap from '../../components/button-map/button-map';
import ObservationInput from '../../components/input-observation/input-observation';
import Button from '../../components/Button/Button';

function FinalizeOrder() {
  const [selectedLocationId, setSelectedLocationId] = useState<string>('');
  const [observation, setObservation] = useState('');
  const [creditBalance, setCreditBalance] = useState<string>('0.00');
  const [totalOrder, setTotalOrder] = useState<string>('0.00');

  // Defina o ID do cliente (pode vir do contexto, auth ou props)
  const customerId = '3'; // substitua pelo id correto do cliente logado
  const baseUrl = 'http://localhost:8000'; // ajuste se necessário

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await fetch(`${baseUrl}/api/v1/customers/${customerId}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Erro ao buscar dados do cliente');
        }

        const data = await response.json();
        setCreditBalance(data.credit_balance);
      } catch (error) {
        console.error('Erro:', error);
      }
    };

    fetchCustomerData();
  }, [customerId, baseUrl]);

  useEffect(() => {
    function calculateTotal() {
      const storedCart = JSON.parse(localStorage.getItem('cartItems') || '[]');
      const sum = storedCart.reduce(
        (acc: number, item: any) => acc + parseFloat(item.price),
        0
      );
      setTotalOrder(sum.toFixed(2));
    }

    calculateTotal();

    window.addEventListener('cartUpdated', calculateTotal);
    return () => window.removeEventListener('cartUpdated', calculateTotal);
  }, []);

  const handleSelectChange = (value: string) => {
    console.log('Selecionado:', value);
    setSelectedLocationId(value);
  };

  // Função que verifica saldo x pedido e exibe alert
  const handleConfirmOrder = () => {
    const saldo = parseFloat(creditBalance);
    const pedido = parseFloat(totalOrder);

    if (pedido > saldo) {
      alert('Você não possui saldo suficiente');
      return;
    }
  };

  return (
    <div>
      <NavbarClient />
      <div className='finalize-order'>
        <h1>Seu pedido</h1>
        <h2>Itens adicionados no seu carrinho:</h2>

        <FinalizeOrderTable />

        <div className='finalize-order-balance-box'>
          <h1>Seu saldo:</h1>
          <p className='finalize-order-balance'>R$ {creditBalance}</p>
        </div>

        {/* <h2>Valor total do pedido:</h2>
        <p style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>R$ {totalOrder}</p> */}

        <h2>• Ao finalizar a compra, o valor do pedido será descontado do saldo.</h2>
        <h2>• Você poderá cancelar o pedido e ser reenbolsado em até 3min.</h2>

        <h1>Selecione o local de entrega:</h1>
        <h2>Use o mapa para selecionar em qual local da UECE você gostaria de receber o pedido:</h2>

        <div className='finalize-order-buttons'>
          <SelectLocal onChange={handleSelectChange} />
          <ButtonMap />
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
          <Button label="Confirmar pedido" variant="secondary" onClick={handleConfirmOrder} />
        </div>
      </div>
    </div>
  );
}

export default FinalizeOrder;
