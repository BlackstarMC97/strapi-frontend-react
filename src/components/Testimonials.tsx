import * as React from 'react';
import { connect } from 'react-redux';
import useContenful from './../useContentful';

const Testimonials = () => {
    const [testimonies, setTestimonies] = React.useState<any>([]);
    const { getTestimons } = useContenful();

    const testimonials = [
      {"Sex": "male", "Name": "Kombila", "Role": "importateur à la République du Congo.", "Message": "Merci pour votre réactivité et votre professionnalisme. Toujours satisfait avec Omnifreight."},
      {"Sex": "male", "Name": "Mbeugong", "Role": "importateur au Cameroun.", "Message": "Omnifreight est mon partenaire sûr."},
      {"Sex": "male", "Name": "Camara", "Role": "importateur en Mauritanie, au Sénégal, en Côte d’Ivoire, à la République du Congo et en Angola.", "Message": "Je suis très content du travail de Omnifreight et chaque jour je suis plus motivé pour travailler avec eux. C’est une société honnête et correcte et ils sont devenus comme des frères."},
      {"Sex": "female", "Name": "Menage", "Role": "enquêteur marketing.", "Message": "Omnifreight est une entreprise proche de ses clients, qui respecte ses engagements et valeurs à savoir la satisfaction client, le savoir-faire et la qualité du service."}
    ]

    React.useEffect(() => {
      getTestimonials();
      //getTestimons().then((response: any) => { setTestimonies(response.items); console.log(response.items); });
    }, []);

    function getTestimonials() {
      fetch("http://localhost:1337/api/testimonies", {
        "method": "GET",
        //"mode": "no-cors"
      })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        setTestimonies(response.data);
      })
      .catch(err => {
        console.error(err);
      });
    }

    return (
      <section className="text-center py-3 bg-light">
        <div className="container my-5">
          <h2 className="mb-4">Ce que nos clients pensent...</h2>
          <div className="row">
            {
              testimonies.length !== 0 ? 
              testimonies.map((testimony: any, i:number) => {
                return (
                  <div key={"dqsdq"+i} className="col-12 col-md-6">
                    <div className="bg-white rounded shadow my-3 px-5 py-4" style={{ minHeight: "225px" }}>
                      <h5>{testimony.attributes.Sex === "male" ? "Mr" : "Mme"} {testimony.attributes.Name}</h5>
                      <h6 className="font-text-role"><em>{testimony.attributes.Role}</em></h6>
                      <p className="font-weight-light mt-3">{testimony.attributes.Message}</p>
                    </div>
                  </div>
                )
              }) : null
            }
          </div>
        </div>
    </section>)
};

export default connect()(Testimonials);
