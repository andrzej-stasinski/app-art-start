import React from 'react';
import PageWrapper from './PageWrapper';
import {Table, Button} from 'react-bootstrap';
import FeaturesItem from './FeaturesItem';
import Auth from './Auth';

const Features = (props) => {
    console.log('isAdmin', props.isAdmin);
  
    const content = (
        <PageWrapper title="Features">
           <div>
               <div className='klasa'>Lorem ipsum dolor sit dolores</div>
               <div className='klasa2'>Optio provident incidunt aliquid magni!</div>
               
               <Table striped bordered hover>
                   <thead>
                       <tr>
                       <th>Lp</th>
                       <th>First Name</th>
                       <th>Last Name</th>
                       {
                       props.isAdmin &&
                           <th colSpan='2'>Actions</th>
                       }
                       
                       </tr>
                   </thead>
                   <tbody>
                       <FeaturesItem isAdmin={props.isAdmin} />
                   </tbody>
               </Table>
           </div>              
       </PageWrapper> 
    )

    return props.isAdmin
    ?
    <Auth> {content} </Auth>
    :
    content

}
  
export default Features;