import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isset } from '../common/utils';
import DashboardNav from './Nav/TopNavbar1';
import FrontPageNav from './Nav/TopNavbar';
import BlogPageNav from './Nav/TopNavbar2';

function Header() {
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);

  // console.log(location);
  if (isset(() => location.pathname)) {
    if (`${location.pathname}`.startsWith('/home')) {
      return <DashboardNav />;
    } else if (
      `${location.pathname}`.startsWith('/blog') ||
      `${location.pathname}`.startsWith('/contact') ||
      `${location.pathname}`.startsWith('/login') ||
      `${location.pathname}`.startsWith('/register') ||
      `${location.pathname}`.startsWith('/contact')
    ) {
      return <BlogPageNav current_slug={location.pathname} />;
    } else if (`${location.pathname}`.startsWith('/blog')) {
      return <BlogPageNav />;
    } else if (isset(() => user.email)) {
      return <DashboardNav />;
    } else {
      return <FrontPageNav />;
    }
  } else {
    return <FrontPageNav />;
  }
}

export default Header;
