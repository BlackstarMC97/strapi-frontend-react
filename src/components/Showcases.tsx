import * as React from 'react';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter, Alert } from 'reactstrap';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import Autocomplete from 'react-autocomplete';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Showcases = () => {
  const [modal, setModal] = React.useState<boolean>(false);
  const [modal2, setModal2] = React.useState<boolean>(false);
  const [modal3, setModal3] = React.useState<boolean>(false);
  const [phone, setPhone] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [departureTown, setDepartureTown] = React.useState<string>("");
  const [arrivalTown, setArrivalTown] = React.useState<string>("");
  const [goodsType, setGoodsType] = React.useState<string>("Conteneur");
  const [containerNumber, setContainerNumber] = React.useState<number>(1);
  const [containerHeight, setContainerHeight] = React.useState<string>("20 pieds");
  const [cities, setCities] = React.useState<any>([]);
  const [show, setShow] = React.useState<any>(false);
  const [load, setLoad] = React.useState<any>(false);

  var requestTimer: any = null;

  function toggle() {
    setModal(!modal);
  }

  function toggle2() {
    setModal2(!modal2);
  }

  function toggle3() {
    setModal3(!modal3);
  }

  /*function getCities(name: string) {
    fetch("https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix="+name, {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
        "x-rapidapi-key": "VTFclTfEVAmshQmaJNoPsbhlnoAcp1i978ojsnVvUKgKp4QiG6"
      }
    })
    .then(response => response.json())
    .then(response => {
      console.log(response.data);
      setCities(response.data);
    })
    .catch(err => {
      console.error(err);
    });
  }*/
/*fetch("https://api.roadgoat.com/api/v2/destinations/auto_complete?q="+name, {
        "method": "GET",
        "headers": {
          'Authorization': 'Basic ' + btoa('623f7e7c80a50b56cd575584c287b67e:b523b3924a4b9e7723dba68306785225')
        }
      })
      .then(response => response.json())
      .then(response => {
        //console.log(response.data);
        setCities(response.data);
        return response.data;
      })
      .catch(err => {
        console.error(err);
      });*/
      
  function getDestinationsReturned(name: string) {
    fetch("https://api.roadgoat.com/api/v2/destinations/auto_complete?q="+name, {
      "method": "GET",
      "headers": {
        'Authorization': 'Basic ' + btoa('85bc91b49169164a5a21e18b68bfed8d:8cc06532d1fb907599b2c4c8dbaa4f77')
      }
    })
    .then(response => response.json())
    .then(response => {
      //console.log(response.data);
      setCities(response.data);
      return response.data;
    })
    .catch(err => {
      console.error(err);
    });
  }

  /*function getDestinations(name: string) {
    fetch("https://api.roadgoat.com/api/v2/destinations/auto_complete?q="+name, {
      "method": "GET",
      "headers": {
        'Authorization': 'Basic ' + btoa('85bc91b49169164a5a21e18b68bfed8d:8cc06532d1fb907599b2c4c8dbaa4f77')
      }
    })
    .then(response => response.json())
    .then(response => {
      //console.log(response.data);
      setCities(response.data);
    })
    .catch(err => {
      console.error(err);
    });
  }*/

  function fakeRequest(value: any, cb: any) {
    if (value.length > 2)
      return setTimeout(cb, 500, value ? getDestinationsReturned(value) : console.log("Check"));
  }

  function validMail(mail: string) {
      return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(mail);
  }

  function sendContactFormRedirect() {
    if (phone !== "" && email !== "") {
      if (validMail(email)) {
        setLoad(true);
        var myHeaders = new Headers();
        myHeaders.append("Accept", "*/");
        myHeaders.append("Content-Type", "application/json");
        fetch("https://omnifreightinfo.azurewebsites.net/api/QuotationBasic", {
          method: "POST",
          body: JSON.stringify({ phoneNumber: phone, email: email }),
          //mode: "no-cors",
          //headers: myHeaders
        }).then(response => response.json()).then(data => {
          toast.success("Le message a été envoyé.", { position: "top-right", autoClose: 4000, hideProgressBar: true, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined });
          window.location.href = "http://www.omnifreight.eu/";
        }).catch(error => { 
          setLoad(false);
          toast.error("Une erreur est survenue.", { position: "top-right", autoClose: 4000, hideProgressBar: true, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined });
        });        
      }
      else {
        toast.info("L'adresse mail n'est pas correcte, vérifiez là.", { position: "top-right", autoClose: 4000, hideProgressBar: true, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined });
      }
    }
    else {
      toast.info("Un ou plusieurs champs sont vides, remplissez les.", { position: "top-right", autoClose: 4000, hideProgressBar: true, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined });
    }
  }

  function sendContactForm() {
    if (phone !== "" && email !== "") {
      if (validMail(email)) {
        setLoad(true);
        var myHeaders = new Headers();
        myHeaders.append("Accept", "*/");
        myHeaders.append("Content-Type", "application/json");
        fetch("https://omnifreightinfo.azurewebsites.net/api/QuotationBasic", {
          method: "POST",
          body: JSON.stringify({ phoneNumber: phone, email: email, departureCity: departureTown, arrivalCity: arrivalTown, goodsType: goodsType !== "Conteneur" ? goodsType : goodsType + "; Nombre : " + containerNumber + "; Hauteur : " + containerHeight }),
        }).then(response => response.json()).then(data => {
          setShow(true);
          setLoad(false);
          toast.success("Le message a été envoyé.", { position: "top-right", autoClose: 4000, hideProgressBar: true, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined });
        }).catch(error => { 
          setLoad(false);
          toast.error("Une erreur est survenue.", { position: "top-right", autoClose: 4000, hideProgressBar: true, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined });
        });        
      }
      else {
        toast.info("L'adresse mail n'est pas correcte, vérifiez là.", { position: "top-right", autoClose: 4000, hideProgressBar: true, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined });
      }
    }
    else {
      toast.info("Un ou plusieurs champs sont vides, remplissez les.", { position: "top-right", autoClose: 4000, hideProgressBar: true, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined });
    }
  }
  
  function sendQuotationForm() {
    if (phone !== "" && email !== "" && arrivalTown !== "" && departureTown !== "") {
      if (validMail(email)) {
        setLoad(true);
        var myHeaders = new Headers();
        myHeaders.append("Accept", "*/");
        myHeaders.append("Content-Type", "application/json");
        fetch("https://omnifreightinfo.azurewebsites.net/api/Quotation", {
          method: "POST",
          body: JSON.stringify({ phoneNumber: phone, email: email, departureCity: departureTown, arrivalCity: arrivalTown, goodsType: goodsType !== "Conteneur" ? goodsType : goodsType + "; Nombre : " + containerNumber + "; Hauteur : " + containerHeight }),
          //mode: "no-cors",
          //headers: myHeaders
        }).then(response => response.json()).then(data => {
          setShow(true);
          setLoad(false);
          toast.success("Le message a été envoyé.", { position: "top-right", autoClose: 4000, hideProgressBar: true, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined });
        }).catch(error => { 
          setLoad(false);
          toast.error("Une erreur est survenue.", { position: "top-right", autoClose: 4000, hideProgressBar: true, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined });
        });        
      }
      else {
        toast.info("L'adresse mail n'est pas correcte, vérifiez là.", { position: "top-right", autoClose: 4000, hideProgressBar: true, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined });
      }
    }
    else {
      toast.info("Un ou plusieurs champs sont vides, remplissez les.", { position: "top-right", autoClose: 4000, hideProgressBar: true, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined });
    }
  }
  
  return (
    <section className="showcase">
        <div className="container-fluid p-0">
          <div className="row g-0">
            <div className="col-lg-6 order-lg-2 text-white showcase-img" style={{backgroundImage: 'url("assets/img/backimage.jpg")'}} />
            <div className="col-lg-6 order-lg-1 my-auto showcase-text">
              <h2>« Vous souhaitez recevoir une cotation pour une expédition de marchandises ? »</h2>
              <div className="mt-4">
                <Button color="primary" className="btn btn-primary custom-btn" onClick={toggle}>Demander une cotation</Button>
              </div>
            </div>
          </div>
          <div className="row g-0">
            <div className="col-lg-6 text-white showcase-img" style={{backgroundImage: 'url("assets/img/reverse-handshake.jpg")'}} />
            <div className="col-lg-6 my-auto showcase-text">
              <h2>« Vous souhaitez qu’un responsable Omnifreight vous contacte ? »</h2>
              <div className="mt-4">
                <Button color="primary" className="btn btn-primary custom-btn" onClick={toggle2}>Contacter un responsable</Button>
              </div>
            </div>
          </div>
          <div className="row g-0">
            <div className="col-lg-6 order-lg-2 text-white showcase-img" style={{backgroundImage: 'url("assets/img/contact.jpg")'}} />
            <div className="col-lg-6 order-lg-1 my-auto showcase-text">
              <h2>« Vous souhaitez voir plus d’informations sur Omnifreight ? »</h2>
              <div className="mt-4">
                <Button color="primary" className="btn btn-primary custom-btn" onClick={toggle3}>Obtenir plus d'informations</Button>
              </div>
            </div>
          </div>
        </div>

        <Modal isOpen={modal} toggle={toggle} size="lg">
          <ModalHeader toggle={toggle} style={{ fontWeight: "bold" }}>Formulaire de contact</ModalHeader>
          <ModalBody>
            {
              show ? <Alert className="mb-3" color="info">Votre message a bien été envoyé, nous vous recontactons dans quelques instants pour vous envoyer votre cotation.</Alert> : null
            }
            <Form>
              <div className="row">
                <div className="col-12 col-md-6">
                  <FormGroup>
                    <Label for="numWhatsapp">Numéro whatsapp</Label>
                    <PhoneInput inputClass="w-100" country={'cm'} value={phone} onChange={(phone: any) => setPhone(phone)} />
                  </FormGroup>
                </div>
                <div className="col-12 col-md-6">
                  <FormGroup>
                    <Label for="email">Email</Label>
                    <Input type="email" name="email" id="email" value={email} onChange={(e: any) => { setEmail(e.target.value); }} placeholder="Entrer votre adresse email" />
                  </FormGroup>
                </div>
                <div className="col-12 col-md-6">
                  <FormGroup>
                    <Label for="departureTown">Ville de départ</Label>
                    <Autocomplete
                      menuStyle={{ zIndex: 99999, border: "1px solid #ddd", position: "fixed" }}
                      wrapperStyle={{ display: "block", zIndex: -9999 }}
                      wrapperProps={{ className: "wrapper-styling" }}
                      renderInput={function(props: any) {
                        return <input type="text" name="departureTown" id="departureTown" className="form-control" placeholder="Entrer la ville de départ de la marchandise" {...props} />
                      }}
                      getItemValue={(item: any) => { console.log(cities); return item.attributes !== undefined ? item.attributes.name : "Chargement en cours..."; }}
                      items={cities}
                      renderItem={(item: any, isHighlighted: any) => (
                        <div style={{ padding: "6px 12px" }} className={`item ${isHighlighted ? 'item-highlighted' : ''}`} key={item.id}>
                          {item.attributes.name}
                        </div>
                      )}
                      value={departureTown}
                      onChange={(event: any, value: any) => {
                        setDepartureTown(value);
                        clearTimeout(requestTimer);
                        requestTimer = fakeRequest(value, (items: any) => {
                          //setCities(items);
                          console.log(items);
                        })
                      }}
                      onSelect={(value: any, item: any) => {
                        // set the menu to only the selected item
                        setDepartureTown(value);
                        setCities([item]);
                      }}
                    />
                  </FormGroup>
                </div>
                <div className="col-12 col-md-6">
                  <FormGroup>
                    <Label for="arrivalTown">Ville d'arrivée</Label>
                    <Autocomplete
                      menuStyle={{ zIndex: 99999, border: "1px solid #ddd", position: "fixed" }}
                      wrapperStyle={{ display: "block" }}
                      renderInput={function(props: any) {
                        return <input type="text" name="arrivalTown" id="arrivalTown" className="form-control" placeholder="Entrer la ville de départ de la marchandise" {...props} />
                      }}
                      getItemValue={(item: any) => { console.log(cities); return item.attributes !== undefined ? item.attributes.name : "Chargement en cours..."; }}
                      items={cities}
                      renderItem={(item: any, isHighlighted: any) => (
                        <div style={{ padding: "6px 12px" }} className={`item ${isHighlighted ? 'item-highlighted' : ''}`} key={item.id}>
                          {item.attributes.name}
                        </div>
                      )}
                      value={arrivalTown}
                      onChange={(event: any, value: any) => {
                        setArrivalTown(value);
                        clearTimeout(requestTimer);
                        requestTimer = fakeRequest(value, (items: any) => {
                          //setCities(items);
                          console.log(items);
                        })
                      }}
                      onSelect={(value: any, item: any) => {
                        // set the menu to only the selected item
                        setArrivalTown(value);
                        setCities([item]);
                      }}
                    />
                  </FormGroup>
                </div>
                <div className="col-12">
                  <FormGroup>
                    <Label for="goodsType">Type de marchandise</Label>
                    <Input type="select" name="goodsType" id="goodsType" value={goodsType} onChange={(e: any) => setGoodsType(e.target.value)}>
                      <option value="Conteneur">Conteneur</option>
                      <option value="Conventionnel">Conventionnel</option>
                      <option value="Vrac">Vrac</option>
                      <option value="RoRo">RoRo</option>
                    </Input>
                  </FormGroup>
                </div>
                
                {
                  goodsType == "Conteneur" ? 
                  <React.Fragment>
                    <div className="col-12 col-md-6">
                      <FormGroup tag="fieldset" className="ml-1">
                        <Label for="containerHeight">Hauteur du conteneur</Label>
                          <FormGroup check className="mt-1">
                            <Label className="mr-5" check><Input type="radio" name="radio1" checked={containerHeight === "20 pieds"} value={containerHeight} onChange={(e: any) => setContainerHeight("20 pieds")} />{' '}20 pieds</Label>
                            <Label check><Input type="radio" name="radio1" checked={containerHeight === "40 pieds"} value={containerHeight} onChange={(e: any) => setContainerHeight("40 pieds")} />{' '}40 pieds</Label>
                          </FormGroup>
                      </FormGroup>
                    </div>
                    <div className="col-12 col-md-6">
                      <FormGroup>
                        <Label for="containerNumber">Nombre de conteneurs</Label>
                        <Input type="number" min={0} max={10} name="containerNumber" id="containerNumber" value={containerNumber} onChange={(e: any) => { setContainerNumber(e.target.value); }} placeholder="Entrer le nombre de conteneurs" />
                      </FormGroup>
                    </div>
                  </React.Fragment> : null
                }
              </div>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color={!load ? "primary" : "secondary"} className="mr-3" onClick={sendQuotationForm} disabled={load === true}>Enregistrer</Button>
            <Button color="secondary" onClick={toggle}>Fermer</Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={modal2} toggle={toggle2} size="lg">
          <ModalHeader toggle={toggle2} style={{ fontWeight: "bold" }}>Formulaire de contact</ModalHeader>
          <ModalBody>
            {
              show ? <Alert className="mb-3" color="info">Votre message a bien été envoyé, vous serez contacté par un responsable Omnifreight dans les heures qui suivent.</Alert> : null
            }
            <Form>
              <div className="row">
                <div className="col-12 col-md-6">
                  <FormGroup>
                    <Label for="numWhatsapp">Numéro whatsapp</Label>
                    <PhoneInput inputClass="w-100" country={'cm'} value={phone} onChange={(phone: any) => setPhone(phone)} />
                  </FormGroup>
                </div>
                <div className="col-12 col-md-6">
                  <FormGroup>
                    <Label for="email">Email</Label>
                    <Input type="email" name="email" id="email" value={email} onChange={(e: any) => { setEmail(e.target.value); }} placeholder="Entrer votre adresse email" />
                  </FormGroup>
                </div>
              </div>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color={!load ? "primary" : "secondary"} className="mr-3" onClick={sendContactForm} disabled={load === true}>Enregistrer</Button>
            <Button color="secondary" onClick={toggle2}>Fermer</Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={modal3} toggle={toggle3} size="lg">
          <ModalHeader toggle={toggle3} style={{ fontWeight: "bold" }}>Formulaire de contact</ModalHeader>
          <ModalBody>
            <Form>
              <div className="row">
                <div className="col-12 col-md-6">
                  <FormGroup>
                    <Label for="numWhatsapp">Numéro whatsapp</Label>
                    <PhoneInput inputClass="w-100" country={'cm'} value={phone} onChange={(phone: any) => setPhone(phone)} />
                  </FormGroup>
                </div>
                <div className="col-12 col-md-6">
                  <FormGroup>
                    <Label for="email">Email</Label>
                    <Input type="email" name="email" id="email" value={email} onChange={(e: any) => { setEmail(e.target.value); }} placeholder="Entrer votre adresse email" />
                  </FormGroup>
                </div>
              </div>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color={!load ? "primary" : "secondary"} className="mr-3" onClick={sendContactFormRedirect} disabled={load === true}>Enregistrer</Button>
            <Button color="secondary" onClick={toggle3}>Fermer</Button>
          </ModalFooter>
        </Modal>

        <ToastContainer />
    </section>
  )
};

export default connect()(Showcases);
