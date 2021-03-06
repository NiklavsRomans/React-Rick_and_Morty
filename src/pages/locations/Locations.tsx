import { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../../components/loader/Loader';
import { Location } from '../../Models/Location';
import LocationCard from '../../components/locationCard/LocationCard';

const Locations = () => {
  // UseStates
  const [locations, setLocations] = useState<Location[]>();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  // Get Episodes API
  const getLocations = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://rickandmortyapi.com/api/location/');
      setLocations(response.data.results);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.status === 404 ? 'Nothing to dislplay' : error.message;
        setErrorMessage(message);
      } else {
        setErrorMessage('Not Axious error');
      }
    } finally {
      setLoading(false);
    }
  };

  // UseEffect
  useEffect(() => {
    getLocations().then();
  }, []);

  return (
    <div className="main">
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <div className="loader-box">
              {loading && <Loader />}
            </div>
            <div className="episode-container">
              {locations && locations.map((
                {
                  id, name, type,
                },
              ) => (
                <LocationCard
                  key={id}
                  id={id}
                  name={name}
                  type={type}
                />
              ))}
              {errorMessage && setErrorMessage}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Locations;
