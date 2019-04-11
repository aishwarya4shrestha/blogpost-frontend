import * as React from "react";
import { Link } from "react-router-dom";

import { logoWhite } from "../../../assests/images";

import { CSSTransition } from "react-transition-group";

import { connect } from "react-redux";
import { Actions } from "../../../actions";
import * as tokenService from "../../../services/token";

import * as routes from "../../../constants/routes";
import { getLoggedInUserId } from "../../../utils/verifyUser";

interface IAppProps {
  isMenuOpen: boolean;
  toggleMenu: (isMenuOpen: boolean) => void;
}

interface IAppState {
  localIsMenuOpen: boolean;
}

interface IMenuProps {
  status: boolean;
  handleLogout: () => void;
}

class Header extends React.Component<IAppProps, IAppState> {
  constructor(props: Readonly<IAppProps>) {
    super(props);
    this.state = {
      localIsMenuOpen: props.isMenuOpen
    };
  }

  componentDidUpdate(prevProps: IAppProps) {
    if (prevProps !== this.props) {
      this.setState({
        localIsMenuOpen: this.props.isMenuOpen
      });
    }
  }

  onClickButton = () => {
    this.props.toggleMenu(this.state.localIsMenuOpen);
  };

  handleLogout = () => {
    tokenService.clear();
    location.replace(routes.LOGIN);
  };

  render() {
    const userName = tokenService.getUserName();
    const profilePicture = tokenService.getProfilePicture();

    return (
      <div className="Header">
        <div className="container">
          <div className="Header__row">
            <div className="Sp-menu">
              <a>
                <i className="material-icons">menu</i>
              </a>
            </div>

            <div className="Header__row__brand">
              <img src={logoWhite} alt="Logo of uvertz" />
            </div>

            {getLoggedInUserId() ? (
              <div className="Header__menu right">
                <ul className="Nav NavRight">
                  <li className="NavRight__user-profile dropdown">
                    <div className="Nav-link" onClick={this.onClickButton}>
                      <span className="profile-img">
                        <img src={profilePicture} alt="user-image" />
                      </span>
                      <span className="profile-name">{userName}</span>
                      <span className="arrow">
                        <i className="material-icons">arrow_drop_down</i>
                      </span>
                    </div>
                    <Menu
                      status={this.state.localIsMenuOpen}
                      handleLogout={this.handleLogout}
                    />
                  </li>
                </ul>
              </div>
            ) : (
              <div className="Header__menu right">
                <ul className="Nav NavRight">
                  <Link
                    to={routes.LOGIN}
                    className="btn btn--blue--outline--active"
                  >
                    Login/Sign up
                  </Link>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const Menu: React.SFC<IMenuProps> = ({ status, handleLogout }) => {
  const menuClass = status ? "Dropdown-menu show" : "Dropdown-menu";
  return (
    <CSSTransition
      in={status}
      timeout={300}
      classNames="popup"
      unmountOnExit={true}
    >
      <div className={menuClass}>
        <ul>
          <Link to={routes.PROFILE} className="Dropdown-menu__item">
            View Profile
          </Link>
          <div className="Dropdown-menu__item" onClick={handleLogout}>
            Log Out
          </div>
        </ul>
      </div>
    </CSSTransition>
  );
};

const mapStateToProps = ({ menuReducer }: any) => {
  return { isMenuOpen: menuReducer.isMenuOpen };
};

const mapDispatchToProps = (dispatch: any) => ({
  toggleMenu: (showMenu: any) => dispatch(Actions.toggleMenu(showMenu)) //TODO: Changeany
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
