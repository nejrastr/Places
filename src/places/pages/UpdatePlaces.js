import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./NewPlace.css";
import useForm from "../../shared/hooks/form-hook";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import PlacePhoto from "../../user/Santorini.jpg";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/components/util/validators";

import Sarajevo from "../../user/sarajevo.jpeg";

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Santorini",
    description: "Perfect Honeymoon destination",
    image: PlacePhoto,
    address: "Santorini, Greece",

    location: { lat: 36.4071255, lng: 25.3382298 },
    creator: "u1",
  },
  {
    id: "p2",
    title: "Sarajevo",
    description: "My hometown",
    image: Sarajevo,
    address: "Sarajevo, BiH",
    location: { lat: "43.8199506", lng: "18.413029" },
    creator: "u1",
  },
  {
    id: "p3",
    title: "Santorini",
    description: "Perfect Honeymoon destination",
    image: PlacePhoto,
    address: "Santorini, Greece",
    location: { lat: "36.4071255", lng: "25.3382298" },
    creator: "u2",
  },
];

const UpdatePlaces = () => {
  const [idLoadin, setLoading] = useState(true);
  const placeId = useParams().placeId;

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: { value: "", isValid: false },
      description: { value: "", isValid: false },
    },
    false
  );
  const identifiedPlace = DUMMY_PLACES.find((p) => p.id === placeId);

  useEffect(() => {
    if (identifiedPlace) {
      setFormData(
        {
          title: {
            value: identifiedPlace.title,
            isValid: true,
          },
          description: {
            value: identifiedPlace.description,
            isValid: true,
          },
        },
        true
      );
    }
    setLoading(false);
  }, [setFormData, identifiedPlace]);

  const placeUpdateSumbitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  if (!identifiedPlace) {
    return (
      <div className="center">
        <h2>Could not find place with this id</h2>
      </div>
    );
  }
  if (idLoadin) {
    return (
      <div className="center">
        <h2>Loading...</h2>
      </div>
    );
  }
  const validators = [
    { type: VALIDATOR_REQUIRE },
    { type: VALIDATOR_MINLENGTH, val: 5 },
  ];

  return (
    <form className="place-form" onSubmit={placeUpdateSumbitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={validators}
        errorText="Please eneter a valid title."
        onInput={inputHandler}
        value={formState.inputs.title.value}
        valid={formState.inputs.title.isValid}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={validators}
        errorText="Please eneter at least 5 characters."
        onInput={inputHandler}
        value={formState.inputs.description.value}
        valid={formState.inputs.title.value}
      />
      <Button type="submit" disabled={!formState.isValid}>
        Update place
      </Button>
    </form>
  );
};

export default UpdatePlaces;
