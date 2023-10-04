import React, { Component } from 'react';
import profileService from '../../features/profile/profileService';
import dataService from '../../features/data/dataService';
import { toast } from 'react-toastify';
import Loader from '../Loader';
import SingleLink from '../SingleLink';
import ToggleSwitch from '../ToggleSwitch';
import CheckInput from '../CheckInput';
import FormProOnlyUpgrade from '../FormProOnlyUpgrade';
import QuillJsEditor from '../QuillJsEditor';
// @see https://react-select.com/home https://medium.com/how-to-react/react-select-dropdown-tutorial-using-react-select-51664ab8b6f3
import Select from 'react-select';
// import makeAnimated from 'react-select/animated';
// import AsyncSelect from 'react-select/async';
import {
  getMicTypes,
  isset,
  getUserAuthState,
  empty,
} from '../../common/utils';
const cred = getUserAuthState();

export default class CreateShow extends Component {
  micTypes = getMicTypes();
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        username: '',
        away_mode: 0,
        pro_only_conversations: 0,
        headline: '',
        about: '',
        interests: [],
        links: [],
        available_on_weekend: 0,
        available_on_weekdays: 0,
        remote_availability: 0,
        in_person_availability: 0,
        haveMic: 0,
        haveWebcam: 0,
        mic_type: '',
        languages: [],
        profile_completed_at: null,
      },
      dp: {
        selectedFile: null,
        value: '',
        interest: '',
      },
      imageURLs: [cred.dp],
      categories: [],
      skills: [],
      accents: [],
      languages: [],
      user: cred,
      isLoading: true,
      usernameExistMsg: '',
      usernameExistErr: false,
      initialUsername: '',
    };
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.updateSingleLink = this.updateSingleLink.bind(this);
    this.initEmptyLink = this.initEmptyLink.bind(this);
    this.rmSingleLink = this.rmSingleLink.bind(this);
    this.checkInputChecked = this.checkInputChecked.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.checkAvailability = this.checkAvailability.bind(this);
  }

  handleContentChange = (e) => {
    if (isset(() => e.target.value)) {
      this.setState({
        formData: {
          ...this.state.formData,
          [e.target.name]: e.target.value,
        },
      });
    }
  };

  checkAvailability = (e) => {
    if (isset(() => e.target.value) && `${e.target.name}` === `username`) {
      profileService
        .usernameExists({ username: this.state.formData.username }, cred.token)
        .then((res) => {
          // toast.success(res.message);
          this.setState({
            usernameExistMsg: res.message,
            usernameExistErr: false,
          });
        })
        .catch((err) => {
          this.setState({
            usernameExistMsg:
              (err.response &&
                err.response.data &&
                err.response.data.message) ||
              err.message ||
              err.toString(),
            usernameExistErr: true,
          });
        });
    }
  };

  handleChange(event) {
    let target = event.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    let name = target.name;

    this.setState({
      [name]: value,
    });
  }

  onFileChange(event) {
    this.setState({
      dp: {
        ...this.state.dp,
        selectedFile: event.target.files[0],
      },
      imageURLs: [URL.createObjectURL(event.target.files[0])],
    });
  }

  onFileUpload = () => {
    const formData = new FormData();
    formData.append('profile_picx', this.state.dp.selectedFile);
    profileService.uploadProfileImage(formData, cred.token).then((res) => {
      toast.success(res.message);
      localStorage.setItem('user', JSON.stringify(res.user));
    });
  };

  loadCSA() {
    dataService.getCSAs(cred.token).then((res) => {
      this.setState({
        categories: res.categories,
        skills: res.skills,
        accents: res.accents,
        languages: res.languages,
      });
    });
  }

  componentDidMount() {
    this.loadCSA();
    profileService
      .getProfileDetails(cred.token)
      .then((res) => {
        const profile = res.profile;
        if (profile.links == null) profile.links = [];
        this.setState({
          formData: profile,
          initialUsername: profile.username,
          isLoading: false,
        });
      })
      .catch((err) => {
        console.log('Error: ', err);
      });
  }

  handleSelectChange = (name, val) => {
    if (isset(() => name) && val !== this.state.formData[name]) {
      this.setState({
        formData: {
          ...this.state.formData,
          [name]: val,
        },
      });
    }
  };

  onSubmit = (e) => {
    e.preventDefault();

    this.setState({ isLoading: false });
    profileService
      .updateProfileDetails(this.state.formData, cred.token)
      .then((res) => {
        toast.success(res.message);
        localStorage.setItem('user', JSON.stringify(res.user));
      });
  };

  updateSingleLink(idx, link) {
    const links = this.state.formData.links;
    links[idx] = link;
    this.setState({
      formData: {
        ...this.state.formData,
        links: links,
      },
    });
  }

  rmSingleLink(idx) {
    const links = this.state.formData.links;
    links.splice(idx, 1);
    this.setState({
      formData: {
        ...this.state.formData,
        links: links,
      },
    });
  }

  initEmptyLink(evt) {
    evt.preventDefault();
    const links = this.state.formData.links;
    links[links.length] = '';
    this.setState({
      formData: {
        ...this.state.formData,
        links: links,
      },
    });
  }

  checkInputChecked(name, inp) {
    if (isset(() => name)) {
      this.setState({
        formData: {
          ...this.state.formData,
          [name]: inp.checked,
        },
      });
    }
  }

  render() {
    return (
      <>
        <div className="App">
          <div className="container profile">
            <div className="textCenter">
              <h1>Profile Details</h1>
              <p>Let's know a bit about you to personalize your experience</p>
            </div>
            <div className="formCenter" style={{ marginTop: '2.5rem' }}>
              <form className="row g-3  formFields" onSubmit={this.onSubmit}>
                <div className="col-12 col-md-6 formField">
                  <label htmlFor="AwayMode" className="formFieldLabel mb-2">
                    Away Mode
                  </label>
                  <ToggleSwitch
                    id="AwayMode"
                    changeCallback={(inp) => {
                      this.checkInputChecked('away_mode', inp);
                    }}
                    checked={this.state.formData.away_mode}
                  />
                  <small className="text-red">
                    Deprioritise your profile and notify users you are
                    unavailable.
                  </small>
                </div>
                <div className="col-12 col-md-6 formField">
                  <label
                    htmlFor="ProOnlyConversations"
                    className="formFieldLabel mb-2"
                  >
                    Pro Only Conversations
                  </label>
                  <ToggleSwitch
                    id="ProOnlyConversations"
                    changeCallback={(inp) => {
                      this.checkInputChecked('pro_only_conversations', inp);
                    }}
                    checked={this.state.formData.pro_only_conversations}
                    disabled
                  />
                  <small className="text-red">
                    Limit inbound messages to fellow PRO users. Great for busy
                    users.
                  </small>
                  <br />
                  <FormProOnlyUpgrade />
                </div>
                <div className="col-md-6">
                  <h3 style={{ marginBottom: '1rem' }}>Profile Image</h3>
                  <div className="flex flex-col gap-2 max-w-sm">
                    <input
                      type="file"
                      onChange={this.onFileChange}
                      className="custom-file-input"
                    />
                    <div className="img-preview-wrap align-self-center">
                      {this.state.imageURLs.map((imageSrc, idx) => (
                        <img
                          key={idx}
                          src={imageSrc}
                          className="img-responsive"
                          alt="Profile"
                        />
                      ))}
                    </div>
                    <label
                      onClick={this.onFileUpload}
                      className="formFieldButton"
                      name="upload"
                    >
                      Upload
                    </label>
                  </div>
                </div>
                <div className="col-md-6 mb-2">
                  <h3>Profile Video</h3>
                  <div
                    className="card"
                    style={{ maxWidth: '80%', marginLeft: '2rem' }}
                  >
                    <div className="icon">
                      <i className="bi bi-person-rolodex md-36"></i>
                    </div>
                    <p className="">
                      Stand out with a profile video.
                      <br />
                      Available with AAP Pro.
                    </p>
                  </div>
                </div>
                <div className="col-12 col-md-12 mt-4 formField flex flex-col">
                  <label htmlFor="username" className="formFieldLabel">
                    Profile Username
                  </label>
                  <small className="text-red">
                    {empty(this.state.initialUsername)
                      ? 'This is your unique username that form your profile link, this can only be set once'
                      : `This is your unique username that form your profile link: https://apvamatch.org/apva/${this.state.formData.username}`}
                  </small>
                  {empty(this.state.initialUsername) ? (
                    <input
                      onChange={this.handleContentChange}
                      onBlur={this.checkAvailability}
                      name="username"
                      className={
                        this.state.usernameExistErr
                          ? 'formFieldInput text-red'
                          : 'formFieldInput'
                      }
                      id="username"
                      value={this.state.formData.username}
                    />
                  ) : (
                    <input
                      name="username"
                      className="formFieldInput"
                      id="username"
                      value={this.state.formData.username}
                      disabled
                    />
                  )}
                  {this.state.usernameExistMsg.length ? (
                    <small
                      className={
                        this.state.usernameExistErr ? 'text-red' : 'text-green'
                      }
                    >
                      {this.state.usernameExistMsg}
                    </small>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="col-12 col-md-12 formField">
                  <label htmlFor="ProfileHeadline" className="formFieldLabel">
                    Profile Headline
                  </label>
                  <small className="text-red">
                    This is your quick elevator pitch, a chance to stand out.
                  </small>
                  <textarea
                    onChange={this.handleContentChange}
                    rows="5"
                    name="headline"
                    className="p-2"
                    id="ProfileHeadline"
                    value={this.state.formData.headline}
                  >
                    {this.state.formData.headline}
                  </textarea>
                </div>
                <div className="col-12 col-md-12 formField">
                  <label htmlFor="AboutMeEditor" className="formFieldLabel">
                    About Me
                  </label>
                  <small className="text-red">
                    Tell APVA MAtch Community about yourself, your experience
                    and the value you can bring to a conversation.
                  </small>
                  <QuillJsEditor
                    id="AboutMeEditor"
                    defaultValue={this.state.formData.about}
                    changeCallback={(quill, quillRef) => {
                      // console.log('Text change!');
                      // console.log(quill.getText()); // Get text only
                      // console.log(quill.getContents()); // Get delta contents
                      // console.log(quill.root.innerHTML);
                      // alert(quill.root.innerHTML);
                      this.handleSelectChange('about', quill.root.innerHTML);
                    }}
                  />
                </div>
                <div className="col-12 col-md-12 formField">
                  <label
                    htmlFor="CategoriesOfInterests"
                    className="formFieldLabel"
                  >
                    Categories of Interests
                  </label>
                  <small className="text-red">
                    What areas would you like to talk about? These a primary
                    match-making attributes!
                  </small>
                  <Select
                    isMulti
                    value={this.state.formData.interests}
                    placeholder="Select Categories of interest"
                    id="CategoriesOfInterests"
                    onChange={(val) => {
                      this.handleSelectChange('interests', val);
                    }}
                    className="formFieldInput react-select-container"
                    classNamePrefix="react-select"
                    options={this.state.categories}
                    name="interests"
                    getOptionValue={(opt) => opt.id}
                    getOptionLabel={(opt) => opt.name}
                  />
                </div>
                <div className="col-12 col-md-12 formField">
                  <label htmlFor="MyPlaces" className="formFieldLabel">
                    My Links
                  </label>
                  <small className="text-red">
                    Add up to 10 links and allow potential collaborators to
                    discover more
                  </small>
                  {this.state.formData.links.map((link, cnt) => (
                    <SingleLink
                      lnk={link}
                      key={cnt}
                      cb={this.updateSingleLink}
                      del={this.rmSingleLink}
                      idx={cnt}
                    />
                  ))}
                  {this.state.formData.links.length < 10 ? (
                    <button
                      type="button"
                      className="mt-3 formFieldButton "
                      onClick={this.initEmptyLink}
                    >
                      <i className="bi bi-plus-circle-fill"></i>
                      <span>Add Link</span>
                    </button>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="col-12 col-md-12 formField">
                  <label htmlFor="LanguagesSpoken" className="formFieldLabel">
                    Languages spoken
                  </label>
                  <Select
                    isMulti
                    value={this.state.formData.languages}
                    placeholder="Select Languages Spoken"
                    id="LanguagesSpoken"
                    onChange={(val) => {
                      this.handleSelectChange('languages', val);
                    }}
                    className="formFieldInput react-select-container"
                    classNamePrefix="react-select"
                    options={this.state.languages}
                    name="languages"
                    getOptionValue={(opt) => opt.id}
                    getOptionLabel={(opt) => opt.name}
                  />
                </div>
                <div className="col-12 col-md-6 formField">
                  <label className="formFieldLabel mb-2">Availability</label>
                  <small className="text-red">
                    When are you typically available to talk?
                  </small>
                  <br />
                  <div className="flex gap-6 items-center">
                    <CheckInput
                      label="Weekends"
                      name="available_on_weekend"
                      changeCallback={(inp) => {
                        this.checkInputChecked('available_on_weekend', inp);
                      }}
                      checked={this.state.formData.available_on_weekend}
                    />
                    <CheckInput
                      label="Weekdays"
                      name="available_on_weekdays"
                      changeCallback={(inp) => {
                        this.checkInputChecked('available_on_weekdays', inp);
                      }}
                      checked={this.state.formData.available_on_weekdays}
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6 formField">
                  <label className="formFieldLabel mb-2">
                    Format Availability
                  </label>
                  <small className="text-red">
                    How are you typically available to talk
                  </small>
                  <br />
                  <div className="flex gap-6 items-center">
                    <CheckInput
                      label="Remote"
                      name="remote_availability"
                      changeCallback={(inp) => {
                        this.checkInputChecked('remote_availability', inp);
                      }}
                      checked={this.state.formData.remote_availability}
                    />
                    <CheckInput
                      label="In-person"
                      name="in_person_availability"
                      changeCallback={(inp) => {
                        this.checkInputChecked('in_person_availability', inp);
                      }}
                      checked={this.state.formData.in_person_availability}
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6 formField">
                  <label className="formFieldLabel mb-2">Equipment</label>
                  <div className="flex gap-2">
                    <ToggleSwitch
                      changeCallback={(inp) => {
                        this.checkInputChecked('haveMic', inp);
                      }}
                      checked={this.state.formData.haveMic}
                    />
                    <span>I have a microphone</span>
                  </div>
                </div>
                <div className="col-12 col-md-6 formField">
                  <label className="formFieldLabel mb-2">
                    <br />
                  </label>
                  <div className="flex gap-2">
                    <ToggleSwitch
                      changeCallback={(val) => {
                        this.checkInputChecked('haveWebcam', val);
                      }}
                      checked={this.state.formData.haveWebcam}
                    />
                    <span>I have a webcam</span>
                  </div>
                  <br />
                </div>
                {this.state.formData.haveMic ? (
                  <div className="col-12 col-md-12 formField">
                    <label htmlFor="MicType" className="formFieldLabel">
                      Mic Type
                    </label>
                    <Select
                      placeholder="Select Mic Type"
                      id="MicType"
                      className="formFieldInput react-select-container"
                      classNamePrefix="react-select"
                      options={this.micTypes}
                      onChange={(val) => {
                        this.handleSelectChange('mic_type', val.value);
                      }}
                      name="mic_type"
                      value={this.micTypes.filter(
                        (obj) =>
                          String(this.state.formData.mic_type) ===
                          String(obj.value)
                      )}
                    />
                  </div>
                ) : (
                  <></>
                )}

                <div className="col-12 col-md-12 formField text-center ">
                  <button type="submit" className="formFieldButton ">
                    {this.state.isLoading ? <Loader /> : <></>}
                    <span>Save</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
}
