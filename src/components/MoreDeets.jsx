import React from 'react';
import PageWrapper from './PageWrapper';
import Auth from './Auth';

const MoreDeep = () => {
    return ( 
        <Auth>
            <PageWrapper title="MoreDeep">
                <div>
                    Content of MoreDeep
                </div>              
            </PageWrapper>             
        </Auth>
    );
}
  
 export default MoreDeep;