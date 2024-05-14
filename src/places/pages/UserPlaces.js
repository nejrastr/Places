import PlaceList from "../components/PlaceList";
import PlacePhoto from "../../user/Santorini.jpg";
import { useParams } from "react-router-dom";
import Sarajevo from "../../user/sarajevo.jpeg";
import Button from "../../shared/components/FormElements/Button";
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
const UserPlaces = (props) => {
  const userId = useParams().userId; //get user id

  const loadedPlaces = DUMMY_PLACES.filter((place) => place.creator === userId);

  return <PlaceList items={loadedPlaces}></PlaceList>;
};
export default UserPlaces;
