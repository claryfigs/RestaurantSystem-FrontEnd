import './style.css'
import NavbarClient from '../../components/navbar-client/navbar-client'
import FiltersButton from '../../components/filters-button/filters-button'
import SearchBar from '../../components/search-bar/search-bar'
import TypeRestaurantButtons from '../../components/type-restaurant-buttons/type-restaurant-buttons'
import RestaurantListClient from '../../components/restaurant-list-client/restaurant-list-client'

function HomeClient() {

  return (
    <div>
      <NavbarClient/>
      <div className='home-client'>

        <div className='home-client-search-space'>
          <SearchBar/>
          <FiltersButton/>
        </div>

        <div className='home-client-texts-space'>
          <h1>Restaurantes</h1>
          <h2>Selecione o restaurante desejado para ver o cardápio</h2>
        </div>

        <TypeRestaurantButtons/>

        <RestaurantListClient/>

      </div>
    </div>
  )
}

export default HomeClient
