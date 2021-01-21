import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
    return (
        <div className="main-footer">
            <div className="container">
                {/* <div className="row">
                    <div className="col">
                        <h4>Immer</h4>
                        <ul className="list-unstyled">
                            <li>first lerson</li>
                            <li>first lerson</li>
                            <li>first lerson</li>
                        </ul>
                    </div>
                    <div className="col">
                        <h4>Immer</h4>
                        <ul className="list-unstyled">
                            <li>first lerson</li>
                            <li>first lerson</li>
                            <li>first lerson</li>
                        </ul>
                    </div>
                    <div className="col">
                        <h4>Immer</h4>
                        <ul className="list-unstyled">
                            <li>first lerson</li>
                            <li>first lerson</li>
                            <li>first lerson</li>
                        </ul>
                    </div>
                </div> */}
                {/* <hr/> */}
                <div className="row">
                        <p className="col-sm">
                            &copy; {new Date().getFullYear()} Nice to meet you | All right recerved | Terms of Service
                        </p>
                    </div>
            </div>
        </div>
    );
}
 
export default Footer;