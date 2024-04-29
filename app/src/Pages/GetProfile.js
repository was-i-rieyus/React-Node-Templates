import React, { useState } from 'react';
import axios from 'axios';

const GetProfile = () => {
  const [profiles, setProfiles] = useState([]);

  const getdata = async () => {
    try {
      const res = await axios.get("http://localhost:5000/data");
      setProfiles(res.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <button className='btn btn-primary my-2' onClick={getdata}>Get Data</button>
      <table className='table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Experience</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {profiles.map(profile => (
            <tr key={profile._id}>
              <td>{profile.name}</td>
              <td>{profile.role}</td>
              <td>{profile.experience}</td>
              <td>
                {profile.image && (
                  <img src={`data:${profile.image.contentType};base64,${profile.image.data}`} alt="Profile" style={{ maxWidth: '100px' }} />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GetProfile;
