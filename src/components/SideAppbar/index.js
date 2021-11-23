import React from 'react';
import './styles.scss';
import {Button, Hidden} from '@material-ui/core';
import {ReactSVG} from 'react-svg';
import history from '../../routes/history';
import {connect} from 'react-redux';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {setCurrentJob} from '../../containers/redux/actions';
import {useSelector} from 'react-redux';

function SideAppBar({location, isAuthenticated, handleUnAuth, onLogout, actions: {setCurrentJob}}) {
  const sideApp = [
    {
      icon: require('../../assets/home.svg'),
      iconActive: require('../../assets/home_active.svg'),
      title: 'Home',
      action: () => history.push(''),
      location: '/',
      isPrivate: false,
      isAdmin: false
    },
    {
      icon: require('../../assets/ai_avatar.svg'),
      iconActive: require('../../assets/ai_avatar_active.svg'),
      title: 'AI Avatars',
      action: () => history.push('/avatars'),
      location: '/avatars',
      isPrivate: false,
      isAdmin: false
    },
    {
      icon: require('../../assets/studio.svg'),
      iconActive: require('../../assets/studio_active.svg'),
      title: 'Studio',
      action: () => history.push('/studio'),
      location: '/studio',
      isPrivate: true,
      isAdmin: false
    },
    {
      icon: require('../../assets/me.svg'),
      iconActive: require('../../assets/me_active.svg'),
      title: 'Me',
      action: () => {
        setCurrentJob(null);
        history.push('/dashboard');
      },
      location: '/dashboard',
      isPrivate: true,
      isAdmin: false
    },
    // {
    //   icon: require('../../assets/market.svg'),
    //   iconActive: require('../../assets/market_active.svg'),
    //   title: 'Market',
    //   location: '/market',
    //   action: () => history.push('/market'),
    //   isPrivate: true,
    //   isAdmin: false
    // },
    // {
    //   icon: require('../../assets/resources.svg'),
    //   iconActive: require('../../assets/resources_active.svg'),
    //   title: 'Resources',
    //   location: '/resource',
    //   action: () => history.push('/resource'),
    //   isPrivate: true,
    //   isAdmin: false
    // },
    {
      icon: require('../../assets/admin.svg'),
      iconActive: require('../../assets/admin_active.svg'),
      title: 'Admin',
      location: '/admin',
      action: () => history.push('/admin'),
      isAdmin: true
    },
    // {
    //   icon: require('../../assets/api.svg'),
    //   iconActive: require('../../assets/api_active.svg'),
    //   title: 'API',
    //   location: '/api',
    //   action: () => history.push('/api'),
    //   isPrivate: true,
    //   isAdmin: false
    // },
    {
      icon: require('../../assets/info.svg'),
      iconActive: require('../../assets/info_active.svg'),
      title: 'About Us',
      location: '/about',
      action: () => history.push('/about'),
      isPrivate: false,
      isAdmin: false
    }
  ];

  const currentUser = useSelector(state => state.rootReducer.currentUser);
  const isAdmin = !!currentUser?.roles?.includes('Admin');

  return (
    <div className="app-bar-width">
      <PerfectScrollbar className="vh-100 d-flex flex-column justify-content-between pb-5">
        <div>
          {sideApp
            .filter(a => !a.isAdmin || (a.isAdmin && isAdmin))
            .map(e => (
              <Button
                key={e.title}
                className={
                  e.location === (location.pathname ?? '/') ? 'app-item-container-active' : 'app-item-container'
                }
                onClick={() => {
                  if (!isAuthenticated && e.isPrivate) {
                    handleUnAuth();
                  } else {
                    e.action();
                  }
                }}>
                <div className=" d-flex flex-column">
                  <Hidden smUp>
                    <ReactSVG
                      src={e.location === (location.pathname ?? '/') ? e.iconActive : e.icon}
                      className="p-0 m-1"
                      beforeInjection={svg => {
                        svg.setAttribute('style', 'width: 36px; height: 36px;');
                      }}
                    />
                  </Hidden>
                  <Hidden xsDown>
                    <ReactSVG
                      src={e.location === (location.pathname ?? '/') ? e.iconActive : e.icon}
                      className="p-0 m-1"
                    />
                  </Hidden>

                  <label className="mb-0 app-item-text">{e.title}</label>
                </div>
              </Button>
            ))}
          <Hidden smUp>
            {isAuthenticated && (
              <Button className="app-item-container" onClick={() => onLogout()}>
                <div className=" d-flex flex-column">
                  <ReactSVG
                    src={require('./../../assets/logout.svg')}
                    beforeInjection={svg => {
                      svg.setAttribute('style', 'width: 32px; height: 32px;');
                    }}
                  />
                  <label className="mb-0 app-item-text">Logout</label>
                </div>
              </Button>
            )}
          </Hidden>
        </div>
      </PerfectScrollbar>
    </div>
  );
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  actions: {
    setCurrentJob: job => {
      dispatch(setCurrentJob(job));
    }
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SideAppBar);
