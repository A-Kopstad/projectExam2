import { useParams } from "react-router-dom";

const VenueInfo = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Venue Info Page</h1>
      <p>Venue ID: {id}</p>
    </div>
  );
};

export default VenueInfo;
