import './Episodes.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Episode } from '../../Models/EpisodeModel';
import Loader from '../../components/loader/Loader';
import EpisodeCard from '../../components/episodeCard/EpisodeCard';

const Episodes = () => {
  // UseStates
  const [episodes, setEpisodes] = useState<Episode[]>();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [filteredEpisodes, setFilteredEpisodes] = useState<string>('');
  const [searchText, setSearchText] = useState<string>('');

  // Get Episodes API
  const getEpisodes = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/episode/${filteredEpisodes}`);
      setEpisodes(response.data.results);
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
    getEpisodes().then();
  }, [filteredEpisodes]);

  const handleSearch = () => {
    const newEpisodes = episodes?.filter((namee) => namee.name.toLowerCase().includes(searchText.toLowerCase()));
    setEpisodes(newEpisodes);
  };

  return (
    <div className="main">
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <div className="search-box">
              <input className="input" type="text" onChange={(e) => setSearchText(e.target.value)} />
              <button onClick={handleSearch}>Search Episode</button>
            </div>
          </div>
          <div className="col-xs-12">
            {loading && <Loader />}
            <div className="episode-container">
              {episodes && episodes.map((
                {
                  id, name, episode,
                },
              ) => (
                <EpisodeCard
                  key={id}
                  id={id}
                  name={name}
                  episode={episode}
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

export default Episodes;
