
import React, {Suspense} from 'react';
import Loader from '../Components/Common/Loader/Loader';

export const withSuspense = ( Component ) => (props) => {
    return (
        <Suspense fallback={<Loader />}>
            <Component {...props} />
        </Suspense>
    )
}
