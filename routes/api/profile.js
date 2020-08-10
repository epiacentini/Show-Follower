const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');

// @route GET api/profile/me
//@desc Get current users profile
// @access private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate('user');

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route POST api/profile
//@desc Create  user profile
// @access private
router.post('/', auth, async (req, res) => {
  const profileFields = {};
  profileFields.user = req.user.id;

  try {
    let profile = new Profile(profileFields);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.log('error');
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.put('/current', auth, async (req, res) => {
  try {
    const { showID } = req.body;
    const show = {
      showId: showID,
    };
    const profile = await Profile.findOne({ user: req.user.id });
    let exists = false;
    for (let i = 0; i < profile.current.length; i++) {
      if (showID === profile.current[i].showId) exists = true;
    }
    if (exists) {
      return res.json({ msg: 'Already Exists' });
    }
    profile.current.unshift(show);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.put('/future', auth, async (req, res) => {
  try {
    const { showID } = req.body;
    const show = {
      fshowId: showID,
    };
    const profile = await Profile.findOne({ user: req.user.id });
    let exists = false;
    for (let i = 0; i < profile.future.length; i++) {
      if (showID === profile.future[i].fshowId) exists = true;
    }
    if (exists) {
      return res.json({ msg: 'Already Exists' });
    }
    profile.future.unshift(show);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.delete('/future/:imdbID', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    const removeIndex = profile.future
      .map(function (e) {
        return e.fshowId;
      })
      .indexOf(req.params.imdbID);
    profile.future.splice(removeIndex, 1);
    await profile.save();
    res.json(profile);
  } catch (error) {}
});

router.delete('/current/:imdbID', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    const removeIndex = profile.current
      .map(function (e) {
        return e.showId;
      })
      .indexOf(req.params.imdbID);
    profile.current.splice(removeIndex, 1);
    await profile.save();
    res.json(profile);
  } catch (error) {}
});

module.exports = router;
