import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { UPDATE_PROFILE, ADD_GAME_TO_PROFILE } from '../utils/mutations';
import GamesDropdown from '../component/GamesDropdown';

const Profile = () => {
  const { loading, error, data } = useQuery(GET_ME);
  const [updateProfile] = useMutation(UPDATE_PROFILE);
  const [addGameToProfile] = useMutation(ADD_GAME_TO_PROFILE);

  const [profileInput, setProfileInput] = useState({
    bio: '',
    socialMediaLinks: {
      facebook: '',
      twitter: '',
      instagram: '',
      snapchat: '',
    },
  });

  const [gameInput, setGameInput] = useState({
    gameId: '',
    console: '',
    gamingUsername: '',
    competitive: false,
    rank: '',
  });

  const handleBioChange = (event) => {
    const { value } = event.target;
    setProfileInput({
      ...profileInput,
      bio: value,
    });
  };

  const handleSocialMediaLinkChange = (platform) => (event) => {
    const { value } = event.target;
    setProfileInput({
      ...profileInput,
      socialMediaLinks: {
        ...profileInput.socialMediaLinks,
        [platform]: value,
      },
    });
  };

  const handleGameChange = (event) => {
    const { name, value } = event.target;
    setGameInput({
      ...gameInput,
      [name]: value,
    });
  };

  const handleCompetitiveChange = (event) => {
    const { checked } = event.target;
    setGameInput({
      ...gameInput,
      competitive: checked,
    });
  };

  const handleProfileSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await updateProfile({ variables: { userId: data.me._id, profileInput } });
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  const handleGameSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await addGameToProfile({ variables: { userId: data.me._id, userGame: gameInput } });
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error! {error.message}</div>;

  const { username, bio, socialMediaLinks, userGames } = data.me;

  return (
    <div className="container">
      <h1>Welcome, {username}!</h1>
      <div className="row">
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-body">
              <h2 className="card-title">Your Bio:</h2>
              <p className="card-text">{bio}</p>
            </div>
          </div>

          <div className="card mb-4">
            <div className="card-body">
              <h2 className="card-title">Social Media Links:</h2>
              <p className="card-text">Facebook: {socialMediaLinks.facebook}</p>
              <p className="card-text">Twitter: {socialMediaLinks.twitter}</p>
              <p className="card-text">Instagram: {socialMediaLinks.instagram}</p>
              <p className="card-text">Snapchat: {socialMediaLinks.snapchat}</p>
            </div>
          </div>

          <div className="card mb-4">
            <div className="card-body">
              <h2 className="card-title">Your Games:</h2>
              {userGames.map((userGame) => (
                <div key={userGame._id} className="mb-3 border rounded p-3">
                  <h4 className="card-subtitle mb-2">{userGame.game.title}</h4>
                  <p className="card-text">Console: {userGame.console}</p>
                  <p className="card-text">Username: {userGame.gamingUsername}</p>
                  <p className="card-text">Competitive: {userGame.competitive ? 'Yes' : 'No'}</p>
                  <p className="card-text">Rank: {userGame.rank}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-body">
              <h2 className="card-title">Update Profile</h2>
              <form onSubmit={handleProfileSubmit}>
                {/* Profile input fields */}
                <div className="form-group">
                  <label>Bio</label>
                  <textarea className="form-control" name="bio" value={profileInput.bio} onChange={handleBioChange} />
                </div>
                {/* Fields for social media links */}
                <div className="form-group">
                  <label>Facebook</label>
                  <input className="form-control" name="facebook" value={profileInput.socialMediaLinks.facebook} onChange={handleSocialMediaLinkChange('facebook')} />
                </div>
                <div className="form-group">
                  <label>Twitter</label>
                  <input className="form-control" name="twitter" value={profileInput.socialMediaLinks.twitter} onChange={handleSocialMediaLinkChange('twitter')} />
                </div>
                <div className="form-group">
                  <label>Instagram</label>
                  <input className="form-control" name="instagram" value={profileInput.socialMediaLinks.instagram} onChange={handleSocialMediaLinkChange('instagram')} />
                </div>
                <div className="form-group">
                  <label>Snapchat</label>
                  <input className="form-control" name="snapchat" value={profileInput.socialMediaLinks.snapchat} onChange={handleSocialMediaLinkChange('snapchat')} />
                </div>
                <button type="submit" className="btn btn-primary">Update Profile</button>
              </form>
            </div>
          </div>

          <div className="card mb-4">
            <div className="card-body">
              <h2 className="card-title">Add a Game</h2>
              <form onSubmit={handleGameSubmit}>
                <div className="form-group">
                  <label>Game</label>
                  <GamesDropdown name="gameId" value={gameInput.gameId} onChange={handleGameChange} />
                </div>
                <div className="form-group">
                  <label>Console</label>
                  <input className="form-control" name="console" value={gameInput.console} onChange={handleGameChange} />
                </div>
                <div className="form-group">
                  <label>Gaming Username</label>
                  <input className="form-control" name="gamingUsername" value={gameInput.gamingUsername} onChange={handleGameChange} />
                </div>
                <div className="form-group">
                  <label>Competitive</label>
                  <input type="checkbox" name="competitive" checked={gameInput.competitive} onChange={handleCompetitiveChange} />
                </div>
                <div className="form-group">
                  <label>Rank</label>
                  <input className="form-control" name="rank" value={gameInput.rank} onChange={handleGameChange} />
                </div>
                <button type="submit" className="btn btn-primary">Add Game</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;