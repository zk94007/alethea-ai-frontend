import React, {Component} from 'react';
import {createMuiTheme} from '@material-ui/core/styles';
import {jssPreset, StylesProvider, ThemeProvider} from '@material-ui/styles';
import {create} from 'jss';
import {ConfirmProvider} from 'material-ui-confirm';
import MuiPickersUtilsProvider from '@material-ui/pickers/MuiPickersUtilsProvider';
import {Router, Switch, Redirect} from 'react-router-dom';
import history from '../routes/history';
import DateFnsUtils from '@date-io/date-fns';
import RoutePublic from '../components/RoutePublic';
import Home from './Home';
import Upload from './Upload';
// import UploadImage from "./UploadImage";
import WelcomeVideo from './WelcomeVideo';
import Generating from './Generating';
import Inventory from './Inventory';
import Hello from './Hello';
import {CssBaseline, Drawer, Hidden} from '@material-ui/core';
import SideAppBar from '../components/SideAppbar';
import {setupHttpConfig} from '../utils/http';
import Login from './Login';
import {connect} from 'react-redux';
import RoutePrivate from '../components/RoutePrivate';
import SignUp from './SignUp';
import AIAvatars from './AIAvatar';
import VerifyEmail from './VerifyEmail';
import CustomAppBar from '../components/AppBar';
import {
  closeDrawer,
  openLoginModal,
  openSignUpModal,
  closeAuthModal,
  setAuthToken,
  requestLogout,
  getPublicAvatars,
  getUserAvatars,
  getPublicCategories,
  getUserCategories
} from './redux/actions';
import Dashboard from './Dashboard';
import Studio from './Studio';
import Api from './Api';
import AboutUs from './AboutUs';
import ResetPassword from './ResetPassword';
import Admin from './Admin';
import MarketPlace from './MarketPlaces';
import Vader from './Vader';
import Venus from './Venus';
// import DemoAlice from './DemoAlice';

class ThemeApp extends Component {
  constructor(props, context) {
    super(props, context);
    this.jss = create({plugins: [...jssPreset().plugins]});

    this.state = {
      location: {}
    };
  }

  theme = createMuiTheme({
    typography: {
      fontFamily: 'Poppins'
    },
    palette: {
      type: 'dark', //prefersDarkMode ? 'dark' : 'light',
      common: {
        black: '#121427'
      },
      primary: {
        main: '#3F4CC9',
        dark: '#2D3AB5',
        light: '#4851AA'
      },
      text: {
        primary: '#FFFFFF',
        secondary: '#71727D',
        hint: '#1214274B',
        disabled: '#71727D'
      },
      action: {
        disabledBackground: '#71727D',
        disabled: 'rgba(255, 255, 255, 0.5)'
      },
      background: {
        default: '#3B4148',
        paper: '#3B4148'
      }
    },
    overrides: {
      MuiButton: {
        root: {
          textTransform: 'none',
          height: 48,
          fontSize: 16,
          lineHeight: 1.5,
          padding: '6px 24px',
          borderRadius: 100,
          '&$disabled': {
            background: 'none'
          }
        },
        sizeSmall: {
          minWidth: 45,
          height: 36
        },
        sizeLarge: {
          height: 54,
          fontSize: 20,
          fontWeight: 500,
          maxWidth: 280
        },
        containedSizeLarge: {
          padding: '12px 32px'
        },
        contained: {
          boxShadow: 'none'
        },
        outlinedSecondary: {
          color: 'white',
          border: '1px solid rgba(255, 255, 255, 0.5)',
          '&:hover': {
            border: '1px solid rgba(255, 255, 255, 1)'
          }
        },
        containedSecondary: {
          color: 'white',
          background: 'transparent',
          backgroundColor: 'transparent',
          '&:hover': {
            backgroundColor: '#575C61'
          }
        },
        containedPrimary: {
          color: 'white',
          background: 'linear-gradient(89.02deg, #6226D9 0.89%, #8C52FF 100%)',
          boxShadow: '0px 8px 16px rgba(98, 38, 217, 0.24), 0px 4px 8px rgba(98, 38, 217, 0.16)'
        },
        colorInherit: {
          backgroundColor: '#2d333a'
        },
        outlined: {
          padding: '6px 24px'
        }
      },
      MuiCheckbox: {
        colorSecondary: {
          '&$checked': {
            color: 'rgba(126, 67, 242, 1)'
          }
        }
      },
      MuiOutlinedInput: {
        input: {
          padding: '14.4px 14px'
        }
      },
      MuiInputBase: {
        root: {
          background: '#2D333A'
        }
      },
      MuiMobileStepper: {
        root: {
          background: 'transparent'
        },
        dots: {
          backgroundColor: 'transparent'
        },
        dot: {
          margin: '2px 6px',
          width: 4,
          height: 4,
          border: '2px solid transparent',
          backgroundColor: 'white'
        },
        dotActive: {
          margin: '0 4px',
          width: 8,
          height: 8,
          border: '2px solid white',
          background: 'linear-gradient(89.02deg, #6226D9 0.89%, #8C52FF 100%), #3F4CC9'
        }
      },
      MuiAppBar: {
        root: {
          '@media (max-width: 576px)': {
            height: 56
          },
          '@media (min-width: 576px)': {
            height: 80
          }
        },
        colorPrimary: {
          '@media (max-width: 576px)': {
            backgroundColor: '#121427'
          },
          '@media (min-width: 576px)': {
            backgroundColor: '#2D333A'
          },
          boxShadow: 'none'
        }
      },
      MuiDrawer: {
        root: {
          '@media (max-width: 576px)': {
            top: '56px !important'
          }
        },
        paper: {
          backgroundColor: '#2D333A',
          '@media (max-width: 576px)': {
            top: '56px !important'
          }
        }
      },
      MuiBackdrop: {
        root: {
          '@media (max-width: 576px)': {
            top: '56px !important'
          }
        }
      },
      MuiAccordionSummary: {
        root: {
          padding: 0,
          '&$expanded': {
            margin: 0
          }
        },
        content: {
          margin: '0 !important'
        }
      },
      MuiAccordion: {
        rounded: {
          '&:last-child': {
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8
          },
          '&:first-child': {
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8
          }
        }
      },
      MuiDialogTitle: {
        root: {
          background: '#2D333A'
        }
      },
      MuiDialogContent: {
        root: {
          padding: '8px 0'
        }
      },
      MuiDialog: {
        paper: {
          margin: 12
        }
      },
      MuiTab: {
        root: {
          textTransform: 'none',
          fontSize: 18,
          lineHeight: '32px',
          '&$selected': {
            color: 'white'
          },
          margin: 4,
          maxWidth: '100%'
        },
        textColorInherit: {
          color: '#dfe1fb',
          opacity: 1,
          '&$selected': {
            backgroundColor: '#2D333A',
            borderRadius: 4
          }
        },
        wrapper: {
          alignItems: 'flex-start'
        }
      },
      MuiAlert: {
        root: {
          backgroundColor: '#3b4148'
        },
        outlinedInfo: {
          borderColor: '#eff2fc',
          color: '#eff2fc'
        }
      },
      MuiSnackbar: {
        anchorOriginBottomCenter: {
          // '@media (min-width: 600px)': {
          //   transform: 'none'
          // }
        }
      }
    }
  });

  componentDidMount() {
    // const myScreenOrientation = window.screen.orientation;
    // myScreenOrientation.lock('portrait');
    window.addEventListener('resize', () => {
      // We execute the same script as before
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    });

    const {
      authToken,
      actions: {closeAuth, getPublicAvatars, getUserAvatars, getPublicCategories, getUserCategories}
    } = this.props;
    closeAuth();
    setupHttpConfig();
    this.setState({location: history.location});
    history.listen(location => this.setState({location}));
    getPublicAvatars();
    getPublicCategories();

    if (authToken) {
      getUserAvatars();
      getUserCategories();
    }
  }

  render() {
    const {
      authToken,
      showDrawer,
      currentUser,
      actions: {closeDrawer, openSignUp, requestLogOut}
    } = this.props;
    const {location} = this.state;
    const isAdmin = !!currentUser?.roles?.includes('Admin');

    return (
      <StylesProvider jss={this.jss}>
        <ThemeProvider theme={this.theme}>
          <CssBaseline />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <ConfirmProvider>
              {location.pathname === '/sothebys' ? '' : <CustomAppBar />}
              <Drawer variant="temporary" open={showDrawer} onBackdropClick={() => closeDrawer()}>
                {location.pathname === '/sothebys' ? (
                  ''
                ) : (
                  <SideAppBar
                    location={location}
                    isAuthenticated={!!authToken}
                    handleUnAuth={() => openSignUp()}
                    onLogout={() => requestLogOut()}
                  />
                )}
              </Drawer>
              <div className="d-flex flex-row">
                <Hidden xsDown>
                  {location.pathname === '/sothebys' ? (
                    ''
                  ) : (
                    <SideAppBar location={location} isAuthenticated={!!authToken} handleUnAuth={() => openSignUp()} />
                  )}
                </Hidden>
                <div className="flex-fill overflow-hidden">
                  <Router history={history}>
                    <Switch>
                      <RoutePublic isAuthenticated={false} path="/" exact component={Home} />
                      <RoutePublic isAuthenticated={!!authToken} path="/login" exact component={Login} />
                      <RoutePublic isAuthenticated={!!authToken} path="/signup" exact component={SignUp} />
                      <RoutePublic isAuthenticated={false} path="/avatars" exact component={AIAvatars} />
                      <RoutePrivate isAuthenticated={!!authToken} path="/upload" exact component={Upload} />
                      <RoutePrivate isAuthenticated={!!authToken} path="/studio" exact component={Studio} />
                      <RoutePublic isAuthenticated={false} path="/generating" exact component={Generating} />
                      <RoutePublic isAuthenticated={false} path="/welcome-video" exact component={WelcomeVideo} />
                      <RoutePublic isAuthenticated={false} path="/inventory" exact component={Inventory} />
                      <RoutePublic isAuthenticated={false} path="/about" exact component={AboutUs} />
                      <RoutePublic isAuthenticated={false} path="/market" exact component={MarketPlace} />
                      <RoutePublic isAuthenticated={false} path="/vader" exact component={Vader} />
                      <RoutePublic isAuthenticated={false} path="/venus" exact component={Venus} />
                      {/* <RoutePublic isAuthenticated={false} path="/sothebys" exact component={DemoAlice} /> */}
                      <RoutePrivate isAuthenticated={!!authToken} path="/hello" exact component={Hello} />
                      <RoutePrivate isAuthenticated={!!authToken} path="/api" exact component={Api} />
                      <RoutePrivate isAuthenticated={!!authToken} path="/dashboard" exact component={Dashboard} />
                      <RoutePublic
                        isAuthenticated={false}
                        path="/reset-password/:newPasswordToken"
                        exact
                        component={ResetPassword}
                      />
                      <RoutePublic
                        isAuthenticated={false}
                        path="/verify-email/:emailToken"
                        exact
                        component={VerifyEmail}
                      />
                      <RoutePrivate isAuthenticated={isAdmin} path="/admin" exact component={Admin} />
                      <Redirect to={'/'} />
                    </Switch>
                  </Router>
                </div>
              </div>
            </ConfirmProvider>
          </MuiPickersUtilsProvider>
        </ThemeProvider>
      </StylesProvider>
    );
  }
}

const mapStateToProps = state => ({
  authToken: state.rootReducer.authToken,
  showDrawer: state.rootReducer.showDrawer,
  currentUser: state.rootReducer.currentUser
});

const mapDispatchToProps = dispatch => ({
  actions: {
    closeDrawer: () => {
      dispatch(closeDrawer());
    },
    setAuthToken: authToken => {
      dispatch(
        setAuthToken({
          authToken
        })
      );
    },
    openLogin: () => {
      dispatch(openLoginModal());
    },
    openSignUp: () => {
      dispatch(openSignUpModal());
    },
    closeAuth: () => {
      dispatch(closeAuthModal());
    },
    requestLogOut: () => {
      dispatch(requestLogout());
    },
    getPublicAvatars: () => {
      dispatch(getPublicAvatars());
    },
    getUserAvatars: () => {
      dispatch(getUserAvatars());
    },
    getPublicCategories: () => {
      dispatch(getPublicCategories());
    },
    getUserCategories: () => {
      dispatch(getUserCategories());
    }
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ThemeApp);
