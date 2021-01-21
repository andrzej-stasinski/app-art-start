import React from 'react';
import Button from 'react-bootstrap/Button';
import '../styles/ScrollTop.css';

const styles = {
    // div: {
    //     display: 'none'
    // }
    // div: {
    //     position: 'fixed', bottom: 20, right: 20,
    //     display: 'none',
    // }
}

const ScrollTop = () => {
    const body = document.body;

    const displayBlock = 'position: fixed; bottom: 20px; right: 20px; display: block';
    const displayNone = 'position: fixed; bottom: 20px; right: 20px; display: none';
     
    body.onscroll = function() {
      const top = document.documentElement.scrollTop;
    //   console.log(top);

      const divTop = document.querySelector('#divTop');
      if(top > 50 ) {
        // divTop.classList.add('showDivTop');
        divTop.setAttribute('style', displayBlock)
      }
      else {
        // divTop.classList.remove('showDivTop');
        divTop.setAttribute('style', displayNone)
      }
    }

    const handleScroll = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        	})        
    }

    return (
        <div id='divTop'>
        {/* <div id='divTop' style={styles.div}> */}
            <div 
                onClick={handleScroll} 
                style={{backgroundColor: 'pink', borderRadius: '50%', cursor: 'pointer'}}>
                <svg 
                    viewBox="0 0 16 16" 
                    className="bi bi-arrow-up-circle-fill divek" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z"/>
                </svg>
            </div>
            {/* <Button onClick={handleScroll}>To Top</Button> */}

            {/* <Button onClick={handleScroll}>            <svg width="3em" height="3em" color='red' viewBox="0 0 16 16" class="bi bi-arrow-up-circle-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z"/>
            </svg></Button> */}
        </div>
    )
}

export default ScrollTop
