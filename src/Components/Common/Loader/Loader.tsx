
import React from 'react'
import loader from '../img/loader.gif'
import l from './Loader.module.css'


const Loader: React.FC = () => {
    return (
        <div className={l.loaderIntro}>
            <div className={l.loader}>
                <img style={{width: '100'}} src={loader} alt='' />
            </div>
        </div>
    )
}

export default Loader
