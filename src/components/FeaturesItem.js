import React from 'react';
import {Button} from 'react-bootstrap';

const FeaturesItem = ({isAdmin}) => {
    console.log('isAdmin: ',isAdmin);
    return (
        <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            {
            isAdmin &&
                <>
                    <td><Button>Action 1</Button></td>
                    <td><Button>Action 2</Button></td>                 
                </>
            }

        </tr>
    )
}

export default FeaturesItem
