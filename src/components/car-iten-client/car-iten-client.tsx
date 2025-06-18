import './car-iten-client.css';
import TrashIcon from '../../assets/trash-icon.png';
import FoodImage from '../../assets/sanduiche.jpg'; // Importe sua imagem aqui

const CarItenClient: React.FC = () => {
  return (

      <div className='car-iten'>
        
        <div className='car-space-image'>
          <div
            className='car-image-food'
            style={{
              backgroundImage: `url(${FoodImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
          </div>
        </div>

        <div className='car-space-infos'>
          <p className='car-infos-title'>Sanduiche delicioso</p>
          <p className='car-infos'>Sabor Queijo</p>
          <p className='car-infos'>x1</p>
          <p className='car-price'>R$ 20,00</p>
        </div>
        
        <div className='car-space-trash'>
          <div className='car-trash-button'>
            <img src={TrashIcon} alt="Ícone da lixeira" className="trash-icon" />
          </div>
        </div>
      
      </div>

  );
};

export default CarItenClient;