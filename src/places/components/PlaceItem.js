import "./PlaceItem.css";
import Button from "../../shared/components/FormElements/Button";
import { Link } from "react-router-dom";

import Card from "../../shared/components/UIElements/Card";
import React, { useState, useContext } from "react";
import AuthContext from "../../shared/context/auth-contex";
import Modal from "../../shared/components/UIElements/Modal";
import Map from "../../shared/components/UIElements/Map";

const PlaceItem = (props) => {
  const auth = useContext(AuthContext);
  const [showMap, setShowMap] = useState(false);
  const openMapHandler = () => {
    setShowMap(true);
  };
  const closeMapHandler = () => {
    setShowMap(false);
  };

  const [showConfirmModal, setShowConfirmModule] = useState(false);

  const showDeleteWarninghandler = () => {
    setShowConfirmModule(true);
  };

  const cancelDeleteWarningHandler = () => {
    setShowConfirmModule(false);
  };

  const confirmDeleteHandler = () => {
    setShowConfirmModule(false);
    console.log("DELETEING...");
  };
  return (
    <React.Fragment>
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={props.address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={closeMapHandler}> Close</Button>}
      >
        <div className="map">
          <Map latitude={props.location.lat} longitude={props.location.lng} />
        </div>
      </Modal>
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteWarningHandler}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteWarningHandler}>
              Cancel
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              Delete
            </Button>
          </React.Fragment>
        }
      >
        <p>Do you want to delete this place?</p>
      </Modal>
      <li className="place-item">
        <Card className="place-item__content">
          <div className="place-item__image">
            <img src={props.image} alt={props.title} />
          </div>
          <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={openMapHandler}>
              View on map
            </Button>
            {auth.isLoggedIn && (
              <Link to={`/places/${props.id}`}>
                <Button>Edit</Button>
              </Link>
            )}
            {auth.isLoggedIn && (
              <Button danger onClick={showDeleteWarninghandler}>
                Delete
              </Button>
            )}
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default PlaceItem;
