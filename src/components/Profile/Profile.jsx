import React from 'react'
import { useSelector } from 'react-redux';
import { ProfileCart, ProfileImg } from './Profile.style';
import { Navigate } from 'react-router-dom';
import {RiEditBoxFill} from 'react-icons/ri'

function Profile() {
  const profile = useSelector(state => state.auth.user);

  if (!profile) return <Navigate to='/login' />

  return (
    <ProfileCart className='p-3 mt-5 mb-5'>
      <div className="svg">
        <RiEditBoxFill/>
      </div>
      <ProfileImg>
        <img src={profile.avatar} alt="avatar" />
      </ProfileImg>
      <h1 className="h3">
        {profile.username}
      </h1>
      <p className='job'>
        {profile.job}
      </p>
      <div className="count">
        Количество постов: {profile.count}
      </div>
    </ProfileCart>
  )
}

export default Profile