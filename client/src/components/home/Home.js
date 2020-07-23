import React, { useState, useEffect, Fragment } from 'react';
import { getCurrentProfile, createProfile } from '../../actions/profileActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import ResultItem from './ResultItem';

const Home = ({
  getCurrentProfile,
  profile: { profile },
  createProfile,
  currentUsers: { currentUsers },
  userQuery,
}) => {
  const API_KEY = '3d8bcfc1';
  const type = 's';

  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('Show');
  const [titles, setTitles] = useState([]);
  const [names, setNames] = useState('');
  const [error, setErrors] = useState('');

  useEffect(() => {
    getCurrentProfile();
  }, []);

  useEffect(() => {
    getTitles();
  }, [userQuery]);

  const getTitles = async () => {
    const res = await fetch(
      `http://www.omdbapi.com/?${type}=${userQuery}&apikey=${API_KEY}&page=1`
    );

    const data = await res.json();
    console.log(data.Response);
    if (data.Response === 'False') {
      setErrors('Invalid Search Attempt');
      setTimeout(function () {
        setErrors('');
      }, 3000);
    } else {
      let filteredTitles = data.Search.filter((title) => title.Type !== 'game');
      setTitles(filteredTitles);
    }
  };

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  };

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(names);
  };

  Modal.setAppElement('#root');

  return (
    <Fragment>
      {profile === null ? (
        <div className="modal">
          <Modal
            isOpen={true}
            style={{
              overlay: {
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: '#43464b',
              },
              content: {
                position: 'absolute',
                top: '35%',
                left: '35%',
                right: '35%',
                bottom: '40%',
                padding: '15px',
                textAlign: 'center',
                border: '3px solid black',
              },
            }}
          >
            <h2>Enter the names of all users</h2>
            <h5>Please separate entries with commas</h5>
            <form onSubmit={(e) => onSubmit(e)}>
              <input
                type="text"
                name="name"
                value={names}
                onChange={(e) => setNames(e.target.value)}
                required
              />
              <br></br>
              <br></br>
              <input type="submit" value="submit" />
            </form>
          </Modal>
        </div>
      ) : (
        <div className="container">
          {error && <h3 className="alert">{error}</h3>}
          <div className="titles">
            {titles.map((title) => (
              <ResultItem
                key={title.imdbIdD}
                title={title.Title}
                poster={title.Poster}
                year={title.Year}
                showID={title.imdbID}
              />
            ))}
          </div>
        </div>
      )}
    </Fragment>
  );
};

Home.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  createProfile: PropTypes.func.isRequired,
  currentUsers: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  currentUsers: state.currentUsers,
});

export default connect(mapStateToProps, { getCurrentProfile, createProfile })(
  Home
);
