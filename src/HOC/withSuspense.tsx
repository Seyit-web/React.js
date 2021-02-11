
import React, {Suspense} from 'react'
import Loader from '../Components/Common/Loader/Loader'

export function withSuspense<WCP>( WrappedComponent: React.ComponentType<WCP> ) {
    return  (props: WCP) => {

        <Suspense fallback={<Loader />}>
            <WrappedComponent {...props} />
        </Suspense>
    }
}