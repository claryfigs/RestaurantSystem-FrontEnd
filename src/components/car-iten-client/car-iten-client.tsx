import './car-iten-client.css';
import TrashIcon from '../../assets/trash-icon.png';

type CarItenClientProps = {
  name: string;
  category: string;
  quantity: number;
  price: string;
  image: string;
  onDelete?: () => void;
};

const CarItenClient: React.FC<CarItenClientProps> = ({
  name,
  category,
  quantity,
  price,
  image,
  onDelete,
}) => {
  const handleDelete = () => {
    if (onDelete) onDelete();
    window.location.reload();
  };

  return (
    <div className='car-iten'>
      <div className='car-space-image'>
        <div
          className='car-image-food'
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
      </div>

      <div className='car-space-infos'>
        <p className='car-infos-title'>{name}</p>
        <p className='car-infos'>{category}</p>
        <p className='car-infos'>Qtd: {quantity}</p>
        <p className='car-price'>R$ {price}</p>
      </div>
      
      <div className='car-space-trash' onClick={handleDelete}>
        <div className='car-trash-button'>
          <img src={TrashIcon} alt="Ícone da lixeira" className="trash-icon" />
        </div>
      </div>
    </div>
  );
};

export default CarItenClient;
