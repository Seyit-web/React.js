
import React from 'react'
import d from './Sms.module.css'


type PropsType = {
    sms: string
}

const Sms: React.FC<PropsType> = (props) => {
    return (
       <li className={d.mItem}>{props.sms}</li>
    )
}

export default Sms
