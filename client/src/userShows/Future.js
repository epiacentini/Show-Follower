import React, { useState, useEffect, Fragment, useRef } from 'react';
import { connect } from 'react-redux';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Moment from 'react-moment';
import Slider from 'react-slick';
import { removeFuture } from '../actions/profileActions';
import PropTypes from 'prop-types';

const Future = ({ profile, removeFuture }) => {
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
    profile.profile.future.forEach(async (show) => {
      const res = await fetch(
        `http://www.omdbapi.com/?${type}=${show.fshowId}&apikey=${API_KEY}`
      );
      data = await res.json();
      console.log(data);
      setFollowing((following) => ({
        ...following,
        [show.showId]: show.date,
      }));
      if (profile.profile.future.length === 0) {
        setTitles([]);
      } else if (profile.profile.future.length === 1) {
        setTitles([data]);
      } else setTitles((titles) => [...titles, data]);
      setSlides(profile.profile.future.length);
      loading = false;
    });
  };

  useEffect(() => {
    populateMovies();
  }, [profile.profile.future]);

  const handleModal = (title, plot, rating, imdbID) => {
    setimdbID(imdbID);
    setcurrTitle(title);
    setcurrPlot(plot);
    setcurrRating(rating);
    setisOpen(!isOpen);
    setAutoPlay(!autoPlay);
  };

  var settings = {
    dots: true,
    slidesToShow: slides > 2 ? 3 : slides,
    slidesToScroll: slides > 2 ? 3 : 1,
    autoplay: autoPlay,
    autoplaySpeed: 3000,
    infinite: false,
    centerMode: true,
    responsive: [
      {
        breakpoint: 1575,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 1075,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

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
                You Started Following On:{' '}
                <Moment format="MM/DD/YYYY">{following[imdbID]}</Moment>
              </h3>
              <button
                onClick={() => {
                  removeFuture(imdbID);
                  setisOpen(!isOpen);
                  window.location.reload(false);
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
        {slides}
        <Slider {...settings}>
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

Future.propTypes = {
  removeFuture: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  currentUsers: state.currentUsers,
});

export default connect(mapStateToProps, { removeFuture })(Future);
