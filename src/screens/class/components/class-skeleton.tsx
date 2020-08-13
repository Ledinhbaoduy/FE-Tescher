import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
export const MultiSkeleton: any = (): any => {
    return (
                <div className="row">
                    <div className="col-sm">
                        <Skeleton animation='wave' className="skeleton" width={350} height={350}/>
                    </div>
                    <div className="col-sm">
                        <Skeleton animation='wave' className="skeleton" width={350} height={350}/>
                    </div>
                    <div className="col-sm">
                        <Skeleton animation='wave' className="skeleton" width={350} height={350}/>
                    </div><br></br>
                </div>
        )
}