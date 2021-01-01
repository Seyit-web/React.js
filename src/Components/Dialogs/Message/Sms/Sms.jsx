
import React from 'react';
import d from './Sms.module.css';

const Sms = (props) => {
    return (
       <li className={d.mItem}>{props.sms}</li>
    );
};
export default Sms;