import React from 'react';
import './finalize-order-table.css';

const FinalizeOrderTable: React.FC = () => {
  return (
    <div className='finalize-order-box'>
                
        <div className='finalize-order-box-columns'>
                
            <div className='finalize-order-column'>
                <p className='finalize-order-column-title'>Categoria</p>
                <p className='finalize-order-column-subtitle'>Sanduíches</p>
                <p className='finalize-order-column-subtitle'>Bebidas</p>
            </div>

            <div className='finalize-order-column'>
                <p className='finalize-order-column-title'>Nome</p>
                <p className='finalize-order-column-subtitle'>Presunto</p>
                <p className='finalize-order-column-subtitle'>Suco de laranja</p>
            </div>

            <div className='finalize-order-column'>
                <p className='finalize-order-column-title'>Restaurante</p>
                <p className='finalize-order-column-subtitle'>UECEANA</p>
                <p className='finalize-order-column-subtitle'>UECEANA</p>
            </div>

            <div className='finalize-order-column2'>
                <p className='finalize-order-column-title'>Quantdade</p>
                <p className='finalize-order-column-subtitle'>x1</p>
                <p className='finalize-order-column-subtitle'>x1</p>
            </div>

            <div className='finalize-order-column2'>
                <p className='finalize-order-column-title'>Valor</p>
                <p className='finalize-order-column-subtitle'>R$ 20,00</p>
                <p className='finalize-order-column-subtitle'>R$ 15,00</p>
            </div>

        </div>
            
        <div className='finalize-order-box-value'>

            <div className='finalize-order-value'>
                <p className='finalize-order-value-title'>Valor total:</p>
                <p className='finalize-order-value-subtitle'>R$ 35,00</p>
            </div>
            
        </div>

    </div>
  );
};

export default FinalizeOrderTable;