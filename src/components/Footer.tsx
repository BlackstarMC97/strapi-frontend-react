import * as React from 'react';
import { connect } from 'react-redux';

const Footer = ({copyright, facebook} : {copyright: string, facebook: string}) => (
    <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 h-100 text-lg-start my-auto">
              <p className="text-muted mb-4 mb-lg-0 text-light">{copyright}</p>
            </div>
            <div className="col-lg-6 h-100 text-lg-end my-auto">
              <ul className="list-inline mb-0">
                <li className="list-inline-item me-4">
                  <a href={facebook} target="_blank"><i className="bi-facebook fs-3" /></a>
                </li>
              </ul>
            </div>
          </div>
        </div>
    </footer>
);

export default connect()(Footer);
