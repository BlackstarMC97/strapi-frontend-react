import * as React from 'react';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter, Alert, ListGroup, ListGroupItem } from 'reactstrap';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
//import Autocomplete from 'react-autocomplete';
import { useDebouncedCallback } from 'use-debounce';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReCAPTCHA from "react-google-recaptcha";
import OutsideClickHandler from 'react-outside-click-handler';
// @ts-ignore
import { CookieBanner } from '@palmabit/react-cookie-law';

const Header = ({data, url} : {data: any, url: string}) => {
    //const [data, setData] = React.useState<any>(null);  
    const [modal, setModal] = React.useState<boolean>(false);
    const [modal2, setModal2] = React.useState<boolean>(false);
    const [modal3, setModal3] = React.useState<boolean>(false);
    const [phone, setPhone] = React.useState<string>("");
    const [email, setEmail] = React.useState<string>("");
    const [message, setMessage] = React.useState<string>("");
    const [departureTown, setDepartureTown] = React.useState<string>("");
    const [arrivalTown, setArrivalTown] = React.useState<string>("");
    //const [goodsType, setGoodsType] = React.useState<string>("");
    const [type, setType] = React.useState<string>("Conteneur");
    const [containerNumber, setContainerNumber] = React.useState<number>(1);
    const [cities, setCities] = React.useState<any>([]);
    const [cities2, setCities2] = React.useState<any>([]);
    const [show, setShow] = React.useState<any>(false);
    const [load, setLoad] = React.useState<any>(false);
    const [captcha, setCaptcha] = React.useState<string | null>(null);
    const [check1, setCheck1] = React.useState<any>(false);
    const [check2, setCheck2] = React.useState<any>(false);
    const [check3, setCheck3] = React.useState<any>(false);
    const [check4, setCheck4] = React.useState<any>(false);
    const [loading, setLoading] = React.useState<any>(false);
    const [loading2, setLoading2] = React.useState<any>(false);
    
    /*React.useEffect(() => {
      getData();
    }, []);

    function getData() {
      fetch("http://localhost:1337/api/landing-pages/1?populate=*", {
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
    }*/
    
    const debouncedDeparture = useDebouncedCallback((value) => { 
      if (value !== "") {
        getDestinationsReturned(value);
      }
      else {
        setCities([]);
      }
    }, 1000);
    const debouncedArrival = useDebouncedCallback((value) => { 
      if (value !== "") {
        getDestinationsReturned2(value);
      }
      else {
        setCities2([]);
      }
    }, 1000);
    
    //var requestTimer: any = null;

    function resetFields() {
      setPhone("237");
      setEmail("");
      setContainerNumber(1);
      //setGoodsType("");
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
      setLoading(true);
      fetch("https://wft-geo-db.p.rapidapi.com/v1/geo/cities?limit=5&namePrefix="+name+"&sort=-population&languageCode=fr", {
        "method": "GET",
        "headers": {
          "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
          "x-rapidapi-key": "VTFclTfEVAmshQmaJNoPsbhlnoAcp1i978ojsnVvUKgKp4QiG6"
        }
      })
      .then(response => response.json())
      .then(response => {
        setCities(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
    }

    function getDestinationsReturned2(name: string) {
      setLoading2(true);
      fetch("https://wft-geo-db.p.rapidapi.com/v1/geo/cities?limit=5&namePrefix="+name+"&sort=-population&languageCode=fr", {
        "method": "GET",
        "headers": {
          "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
          "x-rapidapi-key": "VTFclTfEVAmshQmaJNoPsbhlnoAcp1i978ojsnVvUKgKp4QiG6"
        }
      })
      .then(response => response.json())
      .then(response => {
        setCities2(response.data);
        setLoading2(false);
      })
      .catch(err => {
        console.error(err);
        setLoading2(false);
      });
    }
  
    function onChange(value: any) {
      console.log("Captcha value:", value);
      setCaptcha(value);
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
              //window.open("./assets/omnifreight_flyer.pdf", '_blank');
              download("./assets/omnifreight_flyer.pdf", "Flyer Omnifreight.png");
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
              body: JSON.stringify({ phoneNumber: phone, email: email, departureCity: departureTown, arrivalCity: arrivalTown, goodsType: "Type de cargaison : " + type + "; Quantité : " + containerNumber + "; Message : " + message }),
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

    function download(fileUrl: any, fileName: any) {
      var a = document.createElement("a");
      a.href = fileUrl;
      a.setAttribute("download", fileName);
      a.click();
    }
    
    return (
      <header className="masthead" style={{ background: 'url("'+url + data.BackgroundImage.data.attributes.url+'") no-repeat center center', backgroundSize: "cover" }}>
        <CookieBanner
          message={data.PolicyMessage}
          policyLink={data.PolicyLink}
          wholeDomain={true}
          acceptButtonText={data.PolicyButtonText}
          privacyPolicyLinkText={data.PolicyLinkText}
        />
        <div className="container position-relative">
          <div className="row justify-content-center align-items-center text-center text-white full-height">
            <div className="col-xl-10 mt-3">
              <div className="bg-white mb-0 mb-md-4 pt-1">
                <img className="logo-front" src={url + data.LogoImage.data.attributes.url} alt="omnifreight pro" />
              </div>
              {/* Page heading*/}
              <h1>{data.HeadTitle}</h1>
            </div>

            <div className="row my-3 my-md-0">
              <div className="col-12 col-md-4 my-2 my-md-0">
                <div className="card bg-white rounded shadow border">
                  <div className="card-body showcase-text text-dark">
                    <h2>{data.Block1Title}</h2>
                    <div className="mt-4">
                      <Button color="primary" className="btn btn-primary custom-btn" onClick={toggle}>{data.Block1Button}</Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-4 my-2 my-md-0">
                <div className="card bg-white rounded shadow border">
                  <div className="card-body showcase-text text-dark">
                    <h2>{data.Block2Title}</h2>
                    <div className="mt-4">
                      <Button color="primary" className="btn btn-primary custom-btn" onClick={toggle2}>{data.Block2Button}</Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-4 my-2 my-md-0">
                <div className="card bg-white rounded shadow border">
                  <div className="card-body showcase-text text-dark">
                    <h2>{data.Block3Title}</h2>
                    <div className="mt-4">
                      <Button color="primary" className="btn btn-primary custom-btn" onClick={toggle3}>{data.Block3Button}</Button>
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
                    <Input type="text" name="departureTown" id="departureTown" value={departureTown} onChange={(e: any) => { setDepartureTown(e.target.value); debouncedDeparture(e.target.value); }} placeholder="Entrer la ville de départ de la marchandise" autoComplete="off" />
                    <OutsideClickHandler onOutsideClick={() => { setCities([]); }}>
                      <ListGroup className="custom-list-group">
                        {
                          loading ? <ListGroupItem className="py-2">Chargement en cours...</ListGroupItem>  :
                          cities.map((elm: any, i: number) => {
                            return <ListGroupItem key={"dz"+i} className="py-2 hover-light" onClick={(e: any) => { setDepartureTown(elm.city+", "+elm.country); setCities([]); }}>{elm.city + ", " + elm.country}</ListGroupItem>
                          })
                        }
                      </ListGroup>
                    </OutsideClickHandler>
                  </FormGroup>
                </div>
                <div className="col-12 col-md-6">
                  <FormGroup>
                    <Label for="arrivalTown">Ville et pays d'arrivée des marchandises</Label>
                    <Input type="text" name="arrivalTown" id="arrivalTown" value={arrivalTown} onChange={(e: any) => { setArrivalTown(e.target.value); debouncedArrival(e.target.value); }} placeholder="Entrer la ville d'arrivée de la marchandise" autoComplete="off" />
                    <OutsideClickHandler onOutsideClick={() => { setCities2([]); }}>
                      <ListGroup className="custom-list-group">
                        {
                          loading2 ? <ListGroupItem className="py-2">Chargement en cours...</ListGroupItem>  :
                          cities2.map((elm: any, i: number) => {
                            return <ListGroupItem key={"ez"+i} className="py-2 hover-light" onClick={(e: any) => { setArrivalTown(elm.city+", "+elm.country); setCities2([]); }}>{elm.city + ", " + elm.country}</ListGroupItem>
                          })
                        }
                      </ListGroup>
                    </OutsideClickHandler>
                  </FormGroup>
                </div>
                <div className="col-12 col-md-6">
                  <FormGroup>
                    <Label for="type">Type de cargaison</Label>
                    <Input type="select" name="type" id="type" value={type} onChange={(e: any) => { setType(e.target.value); console.log(e.target.value); }}>
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
                    <Label for="message">Autres détails sur votre besoin (Optionnel)</Label>
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
          <ModalHeader toggle={toggle2} style={{ fontWeight: "bold" }}>Contacter un responsable</ModalHeader>
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
            <Button color={!load ? "primary" : "secondary"} className="mr-3" onClick={sendContactForm} disabled={load === true}>Continuer</Button>
            {/*<Button color="success" onClick={() => { getCities("Paris") }}>Check 1-2</Button>*/}
            <Button color="secondary" onClick={toggle2}>Fermer</Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={modal3} toggle={toggle3} size="lg">
          <ModalHeader toggle={toggle3} style={{ fontWeight: "bold" }}>Télécharger notre brochure</ModalHeader>
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
