import React from 'react';

const styles = {
    h2: {
        textAlign: 'center', paddingTop: '70px'
    }
}

const PageWrapper = ({title, children}) => (
        <div >
            <h2 style={styles.h2}>{title}</h2>
            {children}
        </div>
);
 
export default PageWrapper;