// Bibliotecas
import React, { Component } from 'react';

// Componentes
import Header from '../components/Header';

class Profile extends Component {
  render() {
    return (
      <section data-testid="page-profile" className="top-container">
        <h1>Profile</h1>
        <Header />
      </section>
    );
  }
}

export default Profile;
