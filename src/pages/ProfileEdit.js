// Biblioteca
import React, { Component } from 'react';

// Componentes
import Header from '../components/Header';

class ProfileEdit extends Component {
  render() {
    return (
      <section data-testid="page-profile-edit" className="top-container">
        <Header />
        <h1>Profile-edit</h1>
      </section>
    );
  }
}

export default ProfileEdit;
