import * as React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
//import CallToAction from './CallToAction';
//import Features from './Features';
import Footer from './Footer';
//import Showcases from './Showcases';
import Testimonials from './Testimonials';
//import Testimonials from './Testimonials';

const Home = () => {
  const [data, setData] = React.useState<any>(null);
  const backendUrl:string = "http://localhost:1337";
  
  React.useEffect(() => {
    getData();
  }, []);

  function getData() {
    fetch(backendUrl + "/api/landing-pages/1?populate=*", {
      "method": "GET",
      //"mode": "no-cors"
    })
    .then(response => response.json())
    .then(response => {
      console.log(response.data.attributes);
      setData(response.data.attributes);
    })
    .catch(err => {
      console.error(err);
    });
  }

  if (data != null) { 
    return (
    <React.Fragment>
      <Header data={data} url={backendUrl} />
      <Testimonials />
      <Footer copyright={data.Copyright} facebook={data.FacebookLink} />
    </React.Fragment>
  ); }
  else { 
    return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
      <div>
        <img className="my-5" src="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif" alt="load" />
      </div>
    </div>)
  }
}

export default connect()(Home);
