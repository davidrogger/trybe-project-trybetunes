// Bibliotecas
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Componentes
import Header from '../components/Header';
import Loading from '../components/Loading';

// Serviços
import { getUser } from '../services/userAPI';

import defaultAvatar from '../imgs/default_avatar.svg';

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

  return (
    <>
      <div className="profile-top-container">
        <div className="profile-img-container">
          <img
            data-testid="profile-image"
            src={ userData.image || defaultAvatar }
            alt={ `avatar-${userData.name}` }
          />
        </div>
        <div className="profile-button-container">
          <Link to="/profile/edit">
            <button type="button">Editar perfil</button>
          </Link>
        </div>
      </div>
      <div className="profile-info-container">
        <div>
          <strong>Nome:</strong>
          <p>{ userData.name }</p>
        </div>
        <div>
          <strong>E-mail:</strong>
          <p>{ userData.email }</p>
        </div>
        <div>
          <strong>Descrição:</strong>
          <p>{ userData.description }</p>
        </div>

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
