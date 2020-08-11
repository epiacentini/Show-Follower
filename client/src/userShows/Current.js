import React, { useState, useEffect, Fragment, useRef } from 'react';
import { connect } from 'react-redux';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Moment from 'react-moment';
import { removeCurrent } from '../actions/profileActions';
import PropTypes from 'prop-types';
import Slider from 'react-slick';

const Current = ({ profile, removeCurrent }) => {
  const API_KEY = '3d8bcfc1';
  const type = 'i';

  const [titles, setTitles] = useState([]);
  const [isOpen, setisOpen] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);
  const [currTitle, setcurrTitle] = useState('');
  const [currPlot, setcurrPlot] = useState('');
  const [currRating, setcurrRating] = useState('');
  const [imdbID, setimdbID] = useState('');
  const [following, setFollowing] = useState({});
  const [slides, setSlides] = useState(0);

  let data = null;
  let loading = null;

  const populateMovies = async () => {
    loading = true;
    profile.profile.current.forEach(async (show) => {
      const res = await fetch(
        `http://www.omdbapi.com/?${type}=${show.showId}&apikey=${API_KEY}`
      );
      data = await res.json();
      setFollowing((following) => ({
        ...following,
        [show.showId]: show.date,
      }));
      if (profile.profile.current.length === 0) {
        setTitles([]);
      } else if (profile.profile.current.length === 1) {
        setTitles([data]);
      } else setTitles((titles) => [...titles, data]);
      setSlides(profile.profile.current.length);
      loading = false;
    });
  };

  useEffect(() => {
    populateMovies();
  }, [profile.profile.current]);

  const handleModal = (title, plot, rating, imdbID) => {
    setimdbID(imdbID);
    setcurrTitle(title);
    setcurrPlot(plot);
    setcurrRating(rating);
    setisOpen(!isOpen);
    setAutoPlay(!autoPlay);
  };
  if (slides == 0)
    return (
      <div className="empty">
        <i class="fas fa-exclamation-triangle fa-9x"></i>
        <h1>
          You currently have 0 Entries!<br></br>
          <br></br>Add one to interests to get started.
        </h1>
      </div>
    );
  else
    return (
      <Fragment>
        <div className="current-car">
          {isOpen && (
            <div class="bg-modal">
              <div class="modal-contents">
                <h2>{currTitle}</h2>
                <br></br>
                <h3 className="plot">{currPlot}</h3>
                <br></br>
                <h3>Rating: {currRating}</h3>
                <br></br>
                <h3>
                  You Started Watching On:{' '}
                  <Moment format="MM/DD/YYYY">{following[imdbID]}</Moment>
                </h3>
                <button
                  onClick={() => {
                    removeCurrent(imdbID);
                    setisOpen(!isOpen);
                  }}
                >
                  Remove From List
                </button>
                <div class="close" onClick={() => setisOpen(!isOpen)}>
                  +
                </div>
              </div>
            </div>
          )}
          <Slider
            arrows={true}
            dots={true}
            slidesToShow={slides > 2 ? 3 : slides}
            slidesToScroll={slides > 2 ? 3 : 1}
            autoplay={autoPlay}
            autoplaySpeed={3000}
          >
            {titles.map((title) => (
              <div
                className={
                  slides === 1 ? 'sld-small' : slides === 2 ? 'sld-med' : 'sld'
                }
              >
                <img src={title.Poster} alt="" />
                <div
                  className="rd-more"
                  onClick={() =>
                    handleModal(
                      title.Title,
                      title.Plot,
                      title.Rated,
                      title.imdbID
                    )
                  }
                >
                  <i className=" info fas fa-info-circle fa-lg"></i>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </Fragment>
    );
};

Current.propTypes = {
  removeCurrent: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  currentUsers: state.currentUsers,
});

export default connect(mapStateToProps, { removeCurrent })(Current);
