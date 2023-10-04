import React, { Component } from 'react';
import { NavLink, Navigate } from 'react-router-dom';
import profileService from '../../features/profile/profileService';
import dataService from '../../features/data/dataService';
import { toast } from 'react-toastify';
import Loader from '../Loader';
// @see https://react-select.com/home https://medium.com/how-to-react/react-select-dropdown-tutorial-using-react-select-51664ab8b6f3
import Select from 'react-select';
// import makeAnimated from 'react-select/animated';
// import AsyncSelect from 'react-select/async';
import {
  getTimeZones,
  getGenders,
  isset,
  getUserAuthState,
} from '../../common/utils';
const cred = getUserAuthState();

export default class PersonalDetails extends Component {
  tzs = getTimeZones();
  genders = getGenders();
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        first_name: '',
        last_name: '',
        gender: '',
        country: '',
        city: '',
        time_zone: '',
        pd_completed_at: null,
      },
      countries: [],
      cities: [],
      user: cred,
      isLoading: true,
    };
    this.onChange = this.onChange.bind(this);
    this.onCountryChange = this.onCountryChange.bind(this);
    this.onGenderChange = this.onGenderChange.bind(this);
    this.onTZChange = this.onTZChange.bind(this);
    this.onCityChange = this.onCityChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  loadCountries() {
    dataService.getCountries(cred.token).then((res) => {
      this.setState({ countries: res });
    });
  }

  loadCities(cityId) {
    if (Number(cityId) > 0) {
      dataService
        .getCitiesByCountryId(Number(cityId), cred.token)
        .then((res) => {
          this.setState({ cities: res });
        });
    }
  }

  componentDidMount() {
    this.loadCountries();
    profileService
      .getPersonalDetails(cred.token)
      .then((res) => {
        this.setState({ formData: res.personal, isLoading: false });
        this.loadCities(res.personal.country);
      })
      .catch((err) => {
        console.log('Error: ', err);
      });
  }

  onChange = (e) => {
    if (isset(() => e.target.value)) {
      this.setState({
        formData: {
          ...this.state.formData,
          [e.target.name]: e.target.value,
        },
      });
    }
  };

  onCountryChange = (e) => {
    if (isset(() => e.id)) {
      this.loadCities(e.id);
      this.setState({
        formData: {
          ...this.state.formData,
          country: e.id,
        },
      });
    }
  };

  onGenderChange = (e) => {
    if (isset(() => e.value)) {
      this.setState({
        formData: {
          ...this.state.formData,
          gender: e.value,
        },
      });
    }
  };

  onTZChange = (e) => {
    if (isset(() => e.value)) {
      this.setState({
        formData: {
          ...this.state.formData,
          time_zone: e.value,
        },
      });
    }
  };

  onCityChange = (e) => {
    if (isset(() => e.id)) {
      this.setState({
        formData: {
          ...this.state.formData,
          city: e.id,
        },
      });
    }
  };

  onSubmit = (e) => {
    e.preventDefault();

    this.setState({ isLoading: false });
    profileService
      .updatePersonalDetails(this.state.formData, cred.token)
      .then((res) => {
        this.setState({ formData: res.personal });
        toast.success(res.message);
        localStorage.setItem('user', JSON.stringify(res.user));
      });
  };

  render() {
    if (!this.state.isLoading && !isset(() => this.state.user._id)) {
      return <Navigate to="/login" />;
    }

    if (!this.state.isLoading && this.state.user.email_verified_at === null) {
      return <Navigate to="/verify" />;
    }

    let nxtBtn = '';
    // console.log(this.state.formData.pd_completed_at);
    if (this.state.formData.pd_completed_at != null) {
      nxtBtn = (
        <NavLink
          to="/profile/select"
          className="formFieldButton whiteColor blueBg onHover ml-2"
        >
          Next
        </NavLink>
      );
    }

    return (
      <>
        <div className="App">
          <div className="container" style={{ width: '90%' }}>
            <div className="textCenter">
              <h1>About You</h1>
              <p>Let's know a bit about you to personalize your experience</p>
            </div>
            <div className="formCenter" style={{ marginTop: '2.5rem' }}>
              <form className="row g-3  formFields" onSubmit={this.onSubmit}>
                <div className="col-12 col-md-6 formField">
                  <label htmlFor="firstname" className="formFieldLabel">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    className="formFieldInput"
                    placeholder="Enter your First Name"
                    name="first_name"
                    value={this.state.formData.first_name}
                    onChange={this.onChange}
                  />
                </div>
                <div className="col-12 col-md-6 formField">
                  <label htmlFor="lastname" className="formFieldLabel">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="formFieldInput"
                    placeholder="Enter your Last Name"
                    name="last_name"
                    value={this.state.formData.last_name}
                    onChange={this.onChange}
                  />
                </div>
                <div className="col-12 col-md-6 formField">
                  <label htmlFor="inputGender" className="formFieldLabel">
                    Gender
                  </label>
                  <Select
                    id="inputGender"
                    className="formFieldInput react-select-container"
                    classNamePrefix="react-select"
                    options={this.genders}
                    onChange={this.onGenderChange}
                    value={this.genders.filter(
                      (obj) =>
                        String(this.state.formData.gender) === String(obj.value)
                    )}
                  />
                </div>
                <div className="col-12 col-md-6 formField">
                  <label htmlFor="country" className="formFieldLabel">
                    Country
                  </label>
                  <Select
                    placeholder="Select Country"
                    id="inputCountry"
                    onChange={this.onCountryChange}
                    className="formFieldInput react-select-container"
                    classNamePrefix="react-select"
                    options={this.state.countries}
                    name="country"
                    value={this.state.countries.filter(
                      (obj) =>
                        Number(this.state.formData.country) === Number(obj.id)
                    )}
                    getOptionValue={(opt) => opt.id}
                    getOptionLabel={(opt) => opt.name}
                  />
                </div>
                <div className="col-12 col-md-6 formField">
                  <label htmlFor="city" className="formFieldLabel">
                    City
                  </label>
                  <Select
                    placeholder="Select City"
                    id="inputCity"
                    className="formFieldInput react-select-container"
                    classNamePrefix="react-select"
                    options={this.state.cities}
                    onChange={this.onCityChange}
                    name="city"
                    value={this.state.cities.filter(
                      (co) => Number(this.state.formData.city) === Number(co.id)
                    )}
                    getOptionValue={(opt) => opt.id}
                    getOptionLabel={(opt) => opt.name}
                  />
                </div>
                <div className="col-12 col-md-6 formField">
                  <label htmlFor="inputTZ" className="formFieldLabel">
                    Time Zone
                  </label>
                  <Select
                    placeholder="Select Time Zone"
                    id="inputTZ"
                    className="formFieldInput react-select-container"
                    classNamePrefix="react-select"
                    options={this.tzs}
                    onChange={this.onTZChange}
                    name="time_zone"
                    value={this.tzs.filter(
                      (obj) =>
                        String(this.state.formData.time_zone) ===
                        String(obj.value)
                    )}
                  />
                </div>
                <div className="py-2 flex w-full justify-center text-center ">
                  <button type="submit" className="formFieldButton ">
                    {this.state.isLoading ? <Loader /> : <></>}
                    <span>Save</span>
                  </button>
                  {nxtBtn}
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
}
