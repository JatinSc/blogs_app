import React from 'react'
import '../PostLoading.css'

const PostLoading = () => {
    return (
        <div className='skeleton-container'>
            <div className="skeleton-card">
                <div className="skeleton-header">
                    <div>
                        <p className='skeleton-img'></p>
                        <p className='skeleton-text'></p>
                    </div>
                    <div>
                        <p className='skeleton-img'></p>
                        <p className='skeleton-img'></p>
                    </div>
                </div>
                <div className='skeleton-title'>
                    
                </div>
                <div className="skeleton-content">
                   
                </div>
            </div>
            <div className="skeleton-card">
                <div className="skeleton-header">
                    <div>
                        <p className='skeleton-img'></p>
                        <p className='skeleton-text'></p>
                    </div>
                    <div>
                        <p className='skeleton-img'></p>
                        <p className='skeleton-img'></p>
                    </div>
                </div>
                <div className='skeleton-title'>

                </div>
                <div className="skeleton-content">

                </div>
            </div>
            <div className="skeleton-card">
                <div className="skeleton-header">
                    <div>
                        <p className='skeleton-img'></p>
                        <p className='skeleton-text'></p>
                    </div>
                    <div>
                        <p className='skeleton-img'></p>
                        <p className='skeleton-img'></p>
                    </div>
                </div>
                <div className='skeleton-title'>

                </div>
                <div className="skeleton-content">

                </div>
            </div>
        </div>
    )
}

export default PostLoading