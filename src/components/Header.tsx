import * as React from 'react';
import { connect } from 'react-redux';

const Header = () => (
    <header className="masthead">
        <div className="container position-relative">
          <div className="row justify-content-center align-items-center text-center text-white full-height">
            <div className="col-xl-10 my-5">
              <div className="bg-white mb-0 mb-md-4 py-2">
                <img className="logo-front" src="./assets/img/logo-omnifreight-big.png" alt="omnifreight pro" />
              </div>
              {/* Page heading*/}
              <h1>Nous organisons l'expédition de vos marchandises à destination de l'Afrique depuis le monde entier !</h1>
            </div>
          </div>
        </div>
    </header>
);

export default connect()(Header);
