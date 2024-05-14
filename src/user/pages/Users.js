import UsersList from "../components/UsersList";
import UserImage from "../image.png";

const Users = () => {
  const USERS = [
    {
      id: "u1",
      name: "Nejra Strsevic",
      image: UserImage,
      places: "3",
    },
  ]; // DUMMY DATA
  return <UsersList items={USERS} />;
};

export default Users;
