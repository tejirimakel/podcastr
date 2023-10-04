import { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';

import { DarkModeContext } from './contexts/DarkModeContext';

import Home from './routes/Home';
import Verify from './routes/Verify';
import Login from './routes/Login';
import Register from './routes/Register';
import Dashboard from './routes/Dashboard';
import Contact from './routes/Contact';
import Blog from './routes/Blog';
import Errorpage from './routes/404';
import ProfileDetails from './components/Sections/ProfileDetails';
import PersonalDetails from './components/Sections/PersonalDetails';
import ProfileType from './components/Sections/ProfileType';
import Podcast from './components/Sections/Podcast';
import Guest from './components/Sections/Guest';
import Show from './components/Sections/Show';
import Settings from './components/Sections/Settings';
import General from './components/Sections/General';
import Notification from './components/Sections/Notification';
import Booking from './components/Sections/Booking';
import Plan from './components/Sections/Plan';
import Inbox from './components/Sections/Inbox';
import All from './components/Sections/All';
import Unread from './components/Sections/Unread';
import BookingPage from './components/Sections/BookingPage';
import Footer from './components/Sections/Footer';
import RequireAuth from './components/RequireAuth';
import RequireNoAuth from './components/RequireNoAuth';

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <>
      <Router>
        <div className={darkMode ? `dark` : `light`}>
          <Header />
          <Routes>
            <Route
              path="/"
              element={
                <RequireNoAuth>
                  <Home />
                </RequireNoAuth>
              }
            />
            <Route path="contact" element={<Contact />} />
            <Route path="blog" element={<Blog />} />
            <Route
              path="/home"
              element={
                <RequireAuth>
                  <Dashboard />
                </RequireAuth>
              }
            />
            <Route path="verify" element={<Verify />}>
              <Route path=":otp" element={<Verify />}>
                <Route path=":email" element={<Verify />} />
              </Route>
            </Route>
            <Route
              path="/login"
              element={
                <RequireNoAuth>
                  <Login />
                </RequireNoAuth>
              }
            />
            <Route
              path="/register"
              element={
                <RequireNoAuth>
                  <Register />
                </RequireNoAuth>
              }
            />
            <Route
              path="bookings"
              element={
                <RequireAuth mustVerify={false}>
                  <BookingPage />
                </RequireAuth>
              }
            />
            <Route
              path="/profile/personal"
              element={
                <RequireAuth>
                  <PersonalDetails />
                </RequireAuth>
              }
            />
            <Route
              path="/profile/select"
              element={
                <RequireAuth>
                  <ProfileType />
                </RequireAuth>
              }
            />
            <Route
              path="/profile/details"
              element={
                <RequireAuth>
                  <ProfileDetails />
                </RequireAuth>
              }
            />
            <Route
              exact
              path="podcast"
              element={
                <RequireAuth>
                  <Podcast />
                </RequireAuth>
              }
            >
              <Route
                path="guest"
                element={
                  <RequireAuth>
                    <Guest />
                  </RequireAuth>
                }
              />
              <Route
                path="show"
                element={
                  <RequireAuth>
                    <Show />
                  </RequireAuth>
                }
              />
            </Route>
            <Route
              path="settings"
              element={
                <RequireAuth>
                  <Settings />
                </RequireAuth>
              }
            >
              <Route
                path="general"
                element={
                  <RequireAuth>
                    <General />
                  </RequireAuth>
                }
              />
              <Route
                path="notification"
                element={
                  <RequireAuth>
                    <Notification />
                  </RequireAuth>
                }
              />
              <Route
                path="booking"
                element={
                  <RequireAuth>
                    <Booking />
                  </RequireAuth>
                }
              />
              <Route
                path="plan"
                element={
                  <RequireAuth>
                    <Plan />
                  </RequireAuth>
                }
              />
            </Route>
            <Route
              exact
              path="inbox"
              element={
                <RequireAuth>
                  <Inbox />
                </RequireAuth>
              }
            >
              <Route
                path="all"
                element={
                  <RequireAuth>
                    <All />
                  </RequireAuth>
                }
              />
              <Route
                path="unread"
                element={
                  <RequireAuth>
                    <Unread />
                  </RequireAuth>
                }
              />
            </Route>
            <Route path="*" element={<Errorpage />} />
          </Routes>
          <Footer />
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
