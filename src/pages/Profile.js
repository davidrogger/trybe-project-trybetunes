// Bibliotecas
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Componentes
import Header from '../components/Header';
import Loading from '../components/Loading';

// Serviços
import { getUser } from '../services/userAPI';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profileLoading: true,
      userData: '',
    };
  }

  componentDidMount() {
    this.userLogged();
  }

userLogged = async () => {
  const userData = await getUser();
  this.setState({
    userData,
    profileLoading: false,
  });
}

profileDisplay = () => {
  const { userData } = this.state;
  console.log(userData);
  return (
    <>
      <div>
        <img
          data-testid="profile-image"
          src={ userData.image }
          alt={ `avatar-${userData.name}` }
        />
        <Link to="/profile/edit">
          <button type="button">Editar perfil</button>
        </Link>
      </div>
      <div>
        Nome:
        <p>{ userData.name }</p>
      </div>
      <div>
        E-mail:
        { userData.email }
      </div>
      <div>
        Descrição:
        { userData.description }
      </div>
    </>
  );
}

render() {
  const { profileLoading } = this.state;
  return (
    <section data-testid="page-profile" className="top-container">
      <Header />
      <section className="profile-container">
        {profileLoading
          ? <Loading />
          : this.profileDisplay()}
      </section>
    </section>
  );
}
}

export default Profile;
