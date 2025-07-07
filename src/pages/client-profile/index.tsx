import './style.css'
import NavbarClient from '../../components/navbar-client/navbar-client'
import Button from '../../components/Button/Button'

function ProfileClient() {

return (
    <div>
        <NavbarClient/>
        <div className='client-profile'>
            <div className='client-profile-box'>
                <div className='client-profile-infos1'>
                    <div className='client-profile-image'></div>
                    <div className='client-profile-infos2'>
                        <h1>Clara Figueiredo</h1>
                        <h1>Saldo da carteira: 20,00</h1>
                    </div>
                </div>
                
                <div className='client-profile-infos3'>
                    <h2>Matrícula: 123456</h2>
                    <h2>Telefone: +55 85 90000-0000</h2>
                    <h2>Email: clara@gmail.com</h2>
                    <Button label="Editar informações" variant="primary"/>
                </div>


                <h1>Restaurantes Favoritos:</h1>
                <h2>Em breve</h2>

            </div>
        </div>
    </div>
)
}

export default ProfileClient
