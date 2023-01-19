// Biblioteca
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

// Componentes
import Header from '../components/Header';
import Loading from '../components/Loading';

// Serviços
import { getUser, updateUser } from '../services/userAPI';

import defaultAvatar from '../imgs/default_avatar.svg';

class ProfileEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profileEditLoading: true,
      userData: {},
      buttonDisable: true,
      pageRedirect: false,
    };
  }

  componentDidMount() {
    this.getUserData();
  }

  getUserData = async () => {
    const userData = await getUser();
    this.setState({
      userData,
      profileEditLoading: false,
    });
    this.validInput();
  }

  emailValidation = (email) => {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g; // Fonte https://regexr.com/3e48o
    return emailRegex.test(email);
  }

  validInput = () => {
    const { userData: { name, email, image, description } } = this.state;
    const minLength = 1;
    const inputList = [name, email, image, description];
    const lengthValidation = inputList.every((input) => input.length >= minLength);
    const emailTest = this.emailValidation(email);
    const finalTest = lengthValidation && emailTest;
    this.setState({ buttonDisable: !finalTest });
  }

  formsStateUpdate = ({ target }) => {
    const { name, value } = target;
    console.log(value);
    this.setState((prevState) => ({
      userData: { ...prevState.userData, [name]: value },
    }), () => this.validInput());
  }

  saveProfile = async () => {
    const { userData } = this.state;
    this.setState({ profileEditLoading: true });
    await updateUser(userData);
    this.setState({ pageRedirect: true });
  }

  profileForms = () => {
    const { userData, buttonDisable } = this.state;
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
            <input
              data-testid="edit-input-image"
              type="text"
              name="image"
              value={ userData.image }
              onChange={ this.formsStateUpdate }
            />

          </div>
        </div>
        <div className="profile-edit-info-container">

          <strong>Nome:</strong>
          <input
            data-testid="edit-input-name"
            type="text"
            name="name"
            value={ userData.name }
            onChange={ this.formsStateUpdate }
          />

          <strong>E-mail:</strong>
          <input
            data-testid="edit-input-email"
            type="text"
            name="email"
            value={ userData.email }
            onChange={ this.formsStateUpdate }
          />

          <strong>Descrição:</strong>
          <textarea
            data-testid="edit-input-description"
            name="description"
            value={ userData.description }
            onChange={ this.formsStateUpdate }
          />
          <button
            data-testid="edit-button-save"
            type="button"
            disabled={ buttonDisable }
            onClick={ this.saveProfile }
          >
            Salvar

          </button>
        </div>
      </>
    );
  }

  render() {
    const { profileEditLoading, pageRedirect } = this.state;
    return (
      <section data-testid="page-profile-edit" className="top-container">
        <Header />

        <section className="profile-edit-container">
          {profileEditLoading
            ? <Loading />
            : this.profileForms()}

          { pageRedirect && <Redirect to="/profile" /> }

        </section>

      </section>
    );
  }
}

export default ProfileEdit;
