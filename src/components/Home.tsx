import * as React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
//import CallToAction from './CallToAction';
//import Features from './Features';
import Footer from './Footer';
import Showcases from './Showcases';
//import Testimonials from './Testimonials';

const Home = () => (
  <React.Fragment>
    <Header />
    {/*<Features />*/}
    {/*<Showcases />*/}
    {/*<Testimonials />
    <CallToAction />*/}
    <Footer />
  </React.Fragment>
);

export default connect()(Home);
