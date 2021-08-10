import './App.css';
import SignIn from './components/account/SignIn';
import SignUp from './components/account/SignUp';
import Navbar from './components/navbar/Navbar';
import Explore from './components/explore/Explore';
import Playlist from './components/playlist/Playlist';
import MyPlaylist from './components/playlist/MyPlaylist';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Suspense } from 'react';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Suspense fallback={<CircularProgress />}>
          <Switch>
            <Route exact path="/" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <Route path="/explore" component={Explore} />
            <Route path="/playlist/:playlistname" component={MyPlaylist} />
            <Route path="/playlist" component={Playlist} />
          </Switch>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
