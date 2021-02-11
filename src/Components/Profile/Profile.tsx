
import React from 'react'
import Ava from './Ava/Ava'
import MyPostsContainer from './MyPosts/MyPostsContainer'
import p from './Profile.module.css'
import UnderProfile from './UnderProfile/UnderProfile'


type PropsType = {}

const Profile: React.FC<PropsType> = (props) => {
    
    return (
        <div className={p.profile}> 
            <div className={p.discribtion}>
                <UnderProfile />
                <Ava />
            </div>
            <MyPostsContainer />
        </div>
    )
}

export default Profile
