
import React from 'react';
import p from './Post.module.css';
import like from './icons/like.svg';
import chat from './icons/chat.svg';
import arrow from './icons/arrow.svg';
import ava from '../../Ava/img/ava.jpg';

const Post = (props) => {
    return (
        <div className={p.mainPost}>
            <div className={p.photoPost}>
                <img src={ava} alt=""/>
            </div>
            <div className={p.posts}>
                <a href="#" className={p.post}>
                    {props.message}
                </a>
                <span className={p.line}>
                    <hr/>
                </span>
                <div className={p.likes}>
                    <a href="#"><img src={like} alt=""/></a>
                    <a href="#"><img src={chat} alt=""/></a>
                    <a href="#"><img src={arrow} alt=""/></a>
                </div>
            </div>
        </div>
    );
}
export default Post;