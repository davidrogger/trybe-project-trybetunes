// Bibliotecas
import React, { Component } from 'react';

// Componentes
import Header from '../components/Header';

class Profile extends Component {
  render() {
    return (
      <section data-testid="page-profile">
        <h1>Profile</h1>
        <Header />
      </section>
    );
  }
}

export default Profile;
