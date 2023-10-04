import React, { Component } from 'react';
import { Navigate, NavLink } from 'react-router-dom';
import personalService from '../../features/profile/profileService';
import { toast } from 'react-toastify';
import Spinner from '../Spinner';
import { getUserAuthState, isset } from '../../common/utils';
const cred = getUserAuthState();

export default class ProfileType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_type: cred.user_type,
      user: cred,
      isLoading: false,
    };
    this.switchTo = this.switchTo.bind(this);
  }

  switchTo = (t) => {
    const ut = `${t}`.trim();
    if (ut.length) {
      this.setState({
        user_type: ut,
      });

      personalService
        .updateUserType({ user_type: ut }, cred.token)
        .then((res) => {
          toast.success(res.message);
          localStorage.setItem('user', JSON.stringify(res.user));
        });
    }
  };

  render() {
    if (this.state.isLoading) {
      return <Spinner />;
    }
    if (!isset(() => this.state.user._id)) {
      return <Navigate to="/login" />;
    }

    if (this.state.user.email_verified_at === null) {
      return <Navigate to="/verify" />;
    }

    let talentClass = 'talent-card card';
    let guestClass = 'guest-card card';
    let sponsorClass = 'sponsor-card card';
    let toLink = '';
    if (String(this.state.user_type) === String('Talent')) {
      talentClass += ' current';
      toLink = '/profile/details';
    } else if (String(this.state.user_type) === String('Sponsor')) {
      sponsorClass += ' current';
      toLink = '/profile/sponsor';
    } else if (String(this.state.user_type) === String('Guest')) {
      guestClass += ' current';
      toLink = '/profile/details';
    }

    const sText = this.state.user_type == null ? 'Set' : 'Switch';

    return (
      <>
        <div className="App">
          <div className="container" style={{ width: '90%' }}>
            <div className="textCenter">
              <h1>Let's get your user type sorted!</h1>
              <p>Create a profile that matches your portfolio,</p>
              <p>this way, your profile get in front of the right audience.</p>
              <h1>Are you:</h1>
            </div>
            <div className="content ProfileTypesSelectWrap">
              <div className={talentClass}>
                <i className="current-type-icon bi bi-check-circle-fill"></i>
                <div className="icon">
                  <i className="bi bi-person-bounding-box md-36"></i>
                </div>
                <p className="title">A Talent</p>
                <small>
                  Pick this profile option if you're a Podcaster,
                  Voiceoverartist, or Spoken-word artist
                </small>
                <label
                  className="formFieldButton"
                  onClick={(event) => {
                    this.switchTo('Talent');
                  }}
                >
                  {sText} to Talent
                </label>
              </div>
              <div className={sponsorClass}>
                <i className="current-type-icon bi bi-check-circle-fill"></i>
                <div className="icon">
                  <i className="bi bi-briefcase-fill md-36"></i>
                </div>
                <p className="title">A Sponsor</p>
                <small>
                  Pick this profile option if you're a
                  Scout/Client/Sponsor/Brand looking out for Talents
                </small>
                <label
                  className="formFieldButton"
                  onClick={(event) => {
                    this.switchTo('Sponsor');
                  }}
                >
                  {sText} to Sponsor
                </label>
              </div>
              <div className={guestClass}>
                <i className="current-type-icon bi bi-check-circle-fill"></i>
                <div className="icon">
                  <i className="bi bi-person-rolodex md-36"></i>
                </div>
                <p className="title">A Guest</p>
                <small>
                  Pick this profile option if you're a Guest/Speaker looking out
                  for shows to be featured on
                </small>
                <label
                  className="formFieldButton"
                  onClick={(event) => {
                    this.switchTo('Guest');
                  }}
                >
                  {sText} to Guest
                </label>
              </div>
            </div>
            {toLink.length ? (
              <div className="flex justify-center pb-5">
                <NavLink to={toLink} className="btn-yellow">
                  Update {this.state.user_type} Profile
                </NavLink>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </>
    );
  }
}
