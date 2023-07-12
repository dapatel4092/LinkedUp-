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

  const { username, email, bio, socialMediaLinks, userGames } = data.me;

  return (
    <div className="container">
      <h1>Welcome {data.me.username}!</h1>
      <h2>Your Bio:</h2>
      <p>{data.me.bio}</p>

      <h2>Social Media Links:</h2>
      <p>Facebook: {data.me.socialMediaLinks.facebook}</p>
      <p>Twitter: {data.me.socialMediaLinks.twitter}</p>
      <p>Instagram: {data.me.socialMediaLinks.instagram}</p>
      <p>Snapchat: {data.me.socialMediaLinks.snapchat}</p>

      <h2>Your Games:</h2>
      {data.me.userGames.map(userGame => (
        <div key={userGame._id}>
          <h3>Game: {userGame.game.title}</h3>
          <p>Console: {userGame.console}</p>
          <p>Username: {userGame.gamingUsername}</p>
          <p>Competitive: {userGame.competitive ? 'Yes' : 'No'}</p>
          <p>Rank: {userGame.rank}</p>
        </div>
      ))}
      <form onSubmit={handleProfileSubmit}>
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

      <h2>Add a game</h2>
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
  );
};

export default Profile;