import * as React from 'react';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter, Alert } from 'reactstrap';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import Autocomplete from 'react-autocomplete';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReCAPTCHA from "react-google-recaptcha";
// @ts-ignore
import { CookieBanner } from '@palmabit/react-cookie-law';

const Header = () => {
    const [modal, setModal] = React.useState<boolean>(false);
    const [modal2, setModal2] = React.useState<boolean>(false);
    const [modal3, setModal3] = React.useState<boolean>(false);
    const [phone, setPhone] = React.useState<string>("");
    const [email, setEmail] = React.useState<string>("");
    const [message, setMessage] = React.useState<string>("");
    const [departureTown, setDepartureTown] = React.useState<string>("");
    const [arrivalTown, setArrivalTown] = React.useState<string>("");
    const [goodsType, setGoodsType] = React.useState<string>("");
    const [type, setType] = React.useState<string>("");
    const [containerNumber, setContainerNumber] = React.useState<number>(1);
    const [cities, setCities] = React.useState<any>([]);
    const [show, setShow] = React.useState<any>(false);
    const [load, setLoad] = React.useState<any>(false);
    const [captcha, setCaptcha] = React.useState<string | null>(null);
    const [check1, setCheck1] = React.useState<any>(false);
    const [check2, setCheck2] = React.useState<any>(false);
    const [check3, setCheck3] = React.useState<any>(false);
    const [check4, setCheck4] = React.useState<any>(false);

    var requestTimer: any = null;

    function resetFields() {
      setPhone("237");
      setEmail("");
      setContainerNumber(1);
      setGoodsType("");
      setMessage("");
      setDepartureTown("");
      setArrivalTown("");
      setLoad(false);
      setModal(false);
      //setModal2(false);
      setModal3(false);
      setCheck1(false);
      setCheck2(false);
      setCheck3(false);
      setCheck4(false);
    }
    
    function toggle() {
      setModal(!modal);
    }

    function toggle2() {
      setModal2(!modal2);
    }

    function toggle3() {
      setModal3(!modal3);
    }

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
  
    function onChange(value: any) {
      console.log("Captcha value:", value);
      setCaptcha(value);
    }

    function fakeRequest(value: any, cb: any) {
      if (value.length > 2)
        return setTimeout(cb, 500, value ? getDestinationsReturned(value) : console.log("Check"));
    }
  
    function validMail(mail: string) {
        return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(mail);
    }
  
    function sendContactFormRedirect() {
      if (captcha !== null) {
        if (phone !== "" || email !== "") {
          if (email == "" || email !== "" && validMail(email)) {
            setLoad(true);
            var myHeaders = new Headers();
            myHeaders.append("Accept", "*/");
            myHeaders.append("Content-Type", "application/json");
            fetch("https://omnifreightinfo.azurewebsites.net/api/QuotationBasic", {
              method: "POST",
              body: JSON.stringify({ phoneNumber: phone, email: email, goodsType: message }),
              headers: myHeaders
            }).then(data => {
              toast.success("Le message a été envoyé.", { position: "top-right", autoClose: 4000, hideProgressBar: true, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined });
              resetFields();
              window.open("./assets/omnifreight_flyer.pdf", '_blank');
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
      else {
        toast.info("Veuillez cocher le captcha.", { position: "top-right", autoClose: 4000, hideProgressBar: true, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined });
      }
    }
  
    function sendContactForm() {
      if (captcha !== null) {
        if (phone !== "" || email !== "") {
          if (email == "" || email !== "" && validMail(email)) {
            var msg = "Je souhaite avoir des informations sur les sujets suivants : ";
            if (check1) { msg += "Expéditions maritimes; " }
            if (check2) { msg += "Expéditions aériennes; " }
            if (check3) { msg += "Devenir revendeur; " }
            if (check4) { msg += "Opportunités d'emploi. " }
            console.log(msg);
            setLoad(true);
            var myHeaders = new Headers();
            myHeaders.append("Accept", "*/");
            myHeaders.append("Content-Type", "application/json");
            fetch("https://omnifreightinfo.azurewebsites.net/api/QuotationBasic", {
              method: "POST",
              body: JSON.stringify({ phoneNumber: phone, email: email, goodsType: msg+message }),
              headers: myHeaders
            }).then(data => {
              setShow(true);
              setLoad(false);
              resetFields();
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
      else {
        toast.info("Veuillez cocher le captcha.", { position: "top-right", autoClose: 4000, hideProgressBar: true, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined });
      }
    }
    
    function sendQuotationForm() {
      if (captcha !== null) {
        if ((phone !== "" && arrivalTown !== "" && departureTown !== "") || (email !== "" && arrivalTown !== "" && departureTown !== "")) {
          if (email == "" || email !== "" && validMail(email)) {
            setLoad(true);
            var myHeaders = new Headers();
            myHeaders.append("Accept", "*/");
            myHeaders.append("Content-Type", "application/json");
            fetch("https://omnifreightinfo.azurewebsites.net/api/Quotation", {
              method: "POST",
              body: JSON.stringify({ phoneNumber: phone, email: email, departureCity: departureTown, arrivalCity: arrivalTown, goodsType: message }),
              headers: myHeaders
            }).then(data => {
              setShow(true);
              setLoad(false);
              toast.success("Le message a été envoyé.", { position: "top-right", autoClose: 4000, hideProgressBar: true, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined });
              resetFields();
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
      else {
        toast.info("Veuillez cocher le captcha.", { position: "top-right", autoClose: 4000, hideProgressBar: true, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined });
      }
    }
    
    return (
      <header className="masthead">
        <CookieBanner
          message="Ce site utilise des cookies. En continuant d'utiliser ce site, vous acceptez leur utilisation. Pour plus de détails, veuillez consulter notre"
          policyLink="/privacy-policy"
          wholeDomain={true}
          acceptButtonText="J'ai compris"
          privacyPolicyLinkText="politique de confidentialité"
          onAccept = {() => {}}
          onAcceptPreferences = {() => {}}
          onAcceptStatistics = {() => {}}
          onAcceptMarketing = {() => {}}
        />
        <div className="container position-relative">
          <div className="row justify-content-center align-items-center text-center text-white full-height">
            <div className="col-xl-10 mt-3">
              <div className="bg-white mb-0 mb-md-4 pt-1">
                <img className="logo-front" src="./assets/img/logo-omnifreight-big.png" alt="omnifreight pro" />
              </div>
              {/* Page heading*/}
              <h1>Nous organisons l'expédition de vos marchandises à destination de l'Afrique depuis le monde entier !</h1>
            </div>

            <div className="row my-3 my-md-0">
              <div className="col-12 col-md-4 my-2 my-md-0">
                <div className="card bg-white rounded shadow border">
                  <div className="card-body showcase-text text-dark">
                    <h2>« Vous souhaitez recevoir une cotation pour une expédition de marchandises ? »</h2>
                    <div className="mt-4">
                      <Button color="primary" className="btn btn-primary custom-btn" onClick={toggle}>Demander une cotation</Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-4 my-2 my-md-0">
                <div className="card bg-white rounded shadow border">
                  <div className="card-body showcase-text text-dark">
                    <h2>« Vous souhaitez qu’un responsable Omnifreight vous contacte ? »</h2>
                    <div className="mt-4">
                      <Button color="primary" className="btn btn-primary custom-btn" onClick={toggle2}>Contacter un responsable</Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-4 my-2 my-md-0">
                <div className="card bg-white rounded shadow border">
                  <div className="card-body showcase-text text-dark">
                    <h2>« Vous souhaitez voir plus d’informations sur Omnifreight ? »</h2>
                    <div className="mt-4">
                      <Button color="primary" className="btn btn-primary custom-btn" onClick={toggle3}>Télécharger notre brochure</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Modal isOpen={modal} toggle={toggle} size="lg">
          <ModalHeader toggle={toggle} style={{ fontWeight: "bold" }}>Demande de cotation</ModalHeader>
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
                    <Label for="departureTown">Ville et pays de départ des marchandises</Label>
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
                    <Label for="arrivalTown">Ville et pays d'arrivée des marchandises</Label>
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
                <div className="col-12 col-md-6">
                  <FormGroup>
                    <Label for="type">Type de cargaison</Label>
                    <Input type="select" name="type" id="type" value={type} onChange={(e: any) => setType(e.target.value)}>
                      <option value="Conteneur">Conteneur</option>
                      <option value="Conventionnel">Conventionnel</option>
                      <option value="RoRo">RoRo</option>
                    </Input>
                  </FormGroup>
                </div>
                <div className="col-12 col-md-6">
                  <FormGroup>
                    <Label for="qty">Quantité</Label>
                    <Input type="number" name="qty" id="qty" value={containerNumber} onChange={(e: any) => { setContainerNumber(e.target.value); }} />
                  </FormGroup>
                </div>
                <div className="col-12 col-md-12">
                  <FormGroup>
                    <Label for="message">Entrer les détails sur votre besoin</Label>
                    <Input type="textarea" name="message" id="message" value={message} onChange={(e: any) => { setMessage(e.target.value); }} placeholder="Entrer votre message" />
                  </FormGroup>
                </div>
                <ReCAPTCHA
                  sitekey="6LcapWceAAAAAGab4DRszmgw_uSBgNFSivuYY9kI"
                  onChange={onChange}
                />
              </div>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color={!load ? "primary" : "secondary"} className="mr-3" onClick={sendQuotationForm} disabled={load === true}>Continuer</Button>
            {/*<Button color="secondary" onClick={toggle}>Fermer</Button>*/}
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
                <div className="col-12 col-md-8">
                  <FormGroup className="mb-1">
                    <Label className="font-weight-bolder" for="subject">Sur quels sujets souhaitez vous avoir des informations ?</Label>
                  </FormGroup>
                  <FormGroup className="ml-1 mb-3" check>
                    <Label className="d-block mb-2" check>
                      <Input type="checkbox" checked={check1} value={check1} onChange={(e: any) => { setCheck1(e.target.value); console.log(e.target.checked); }} /> Expéditions maritimes
                    </Label>
                    <Label className="d-block mb-2" check>
                      <Input type="checkbox" checked={check2} value={check2} onChange={(e: any) => { setCheck2(e.target.value); console.log(e.target.checked); }} /> Expéditions aériennes
                    </Label>
                    <Label className="d-block mb-2" check>
                      <Input type="checkbox" checked={check3} value={check3} onChange={(e: any) => { setCheck3(e.target.value); console.log(e.target.checked); }} /> Devenir revendeur
                    </Label>
                    <Label className="d-block mb-2" check>
                      <Input type="checkbox" checked={check4} value={check4} onChange={(e: any) => { setCheck4(e.target.value); console.log(e.target.checked); }} /> Opportunités d'emploi
                    </Label>
                  </FormGroup>
                </div>
                <div className="col-12 col-md-12">
                  <FormGroup>
                    <Label for="message">Entrer les détails sur votre besoin</Label>
                    <Input type="textarea" name="message" id="message" value={message} onChange={(e: any) => { setMessage(e.target.value); }} placeholder="Entrer votre message" />
                  </FormGroup>
                </div>
                <ReCAPTCHA
                  sitekey="6LcapWceAAAAAGab4DRszmgw_uSBgNFSivuYY9kI"
                  onChange={onChange}
                />
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
                <div className="col-12 col-md-12">
                  <FormGroup>
                    <Label for="message">Entrer les détails sur votre besoin</Label>
                    <Input type="textarea" name="message" id="message" value={message} onChange={(e: any) => { setMessage(e.target.value); }} placeholder="Entrer votre message" />
                  </FormGroup>
                </div>
                <ReCAPTCHA
                  sitekey="6LcapWceAAAAAGab4DRszmgw_uSBgNFSivuYY9kI"
                  onChange={onChange}
                />
              </div>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color={!load ? "primary" : "secondary"} className="mr-3" onClick={sendContactFormRedirect} disabled={email === "" || !validMail(email)}>Télécharger</Button>
            {/*<Button color="secondary" onClick={toggle3} disabled={email === "" || !validMail(email)}>Fermer</Button>*/}
          </ModalFooter>
        </Modal>

        <ToastContainer />
    </header>)
};

export default connect()(Header);
