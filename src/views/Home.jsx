import React, {useState} from 'react';
import PageWrapper from '../components/PageWrapper';
import {Carousel, Image} from 'react-bootstrap';
import slide1 from '../images/slider/slide1.jpg';
import slide2 from '../images/slider/slide2.jpg';
import slide3 from '../images/slider/slide3.jpg';
// import img1 from '../images/p1.jpg';
// import img2 from '../images/p2.jpg';

 const Home = () => {

    console.log(slide1.slice(1));
    
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };

    return ( 
         <div>
             <PageWrapper title="Home">
                <div>
                <Carousel activeIndex={index} onSelect={handleSelect}>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src={slide1}
                        alt="First slide"
                        />
                        <Carousel.Caption>
                        <h3>Painting masterpieces</h3>
                        <p>The latest trend in painting fashion in Poland</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src={slide2}
                        alt="Second slide"
                        />
                        <Carousel.Caption>
                        <h3>Perfect painting of pictures</h3>
                        <p>The true beauty of painting is revealed in the beauty of its performance</p>                        
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src={slide3}
                        alt="Third slide"
                        />
                        <Carousel.Caption>
                        <h3>Paintings by Justyna Stasińska</h3>
                        <p>The youngest and most talented painter as the creator of paintings</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
                </div>              
            </PageWrapper>             
         </div>
      );
 }
  
 export default Home;