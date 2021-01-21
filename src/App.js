import React from 'react';
import './styles/App.css';
import Navbar from './Navbar';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from './views/Home';
import Features from './components/Features';
import MoreDeets from './components/MoreDeets';
import Footer from './views/Footer';
import SignIn from './views/SignIn';
import Form from './views/Form';
import Chat from './views/Chat';
import ImgStorage from './views/ImgStorage';
import ImgDatabase from './views/ImgDatabase';
import Forgot from './views/Forgot';
import Progress from './components/Progress';
import Snackbars from './components/Snackbars';
import Snack from './views/Snack';
import Scroll from './views/Scroll';
import ScrollTop from './components/ScrollTop';
import ImgShow from './views/ImgShow';
import ChatAdmin from './views/ChatAdmin'

function App(props) {
  console.log(props)
  return (
  <Router>

      <div className="page-container">
        <div className="content-wrap">
          <Navbar />

            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/paint/" component={Home} />

              <Route path="/Features"></Route>
              <Route path="/Features-admin">
                <Features isAdmin />
              </Route>
              <Route path='/form'>
                <Form />
              </Route>
              <Route path='/img-show/:id?'>
                <ImgShow />
              </Route>
              <Route path='/img_storage'>
                <ImgStorage />
              </Route>
              <Route path='/img_database'>
                <ImgDatabase />
              </Route>
              <Route path='/komentarze-admin'>
                <ChatAdmin />
              </Route>
              <Route path="/MoreDeets">
                <MoreDeets />
              </Route>
              <Route path="/sign-up">
                <SignIn isSignUp />
              </Route>
              <Route path="/sign-in" component={SignIn}>
              </Route>
              <Route path="/sign-up" component={() => <SignIn isSignUp />}>
              </Route>
              <Route path="/forgot"><Forgot /></Route>
              <Route path="/chat"><Chat /></Route>
              <Route path="/snackbars"><Snack /></Route>
              <Route path="/scroll-top"><Scroll /></Route>
            </Switch>
          </div>
          <Footer />
      </div>

      <Progress />
      <Snackbars />
      <ScrollTop />
  </Router>  

  );
}

export default App;
