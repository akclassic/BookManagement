import React from 'react'

export default function Error() {
    return (
        <div className="ErrorPage" 
        style={{ display: 'flex', justifyContent: 'center', width: '100%', alignItems: 'center', fontSize: '2em' }}>
            OOPS! SOMETHING WENT WRONG <i className="fas fa-skull-crossbones"></i>
        </div>
    )
}
