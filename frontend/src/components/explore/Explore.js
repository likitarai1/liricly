import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import ytSearch from '../../apis/ytSearch';
import ExploreList from './ExploreList';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Suspense } from 'react';
import { useStyles } from '../../styles/ExploreStyle';

export default function Explore() {
  const classes = useStyles();

  const [searchstate, setSearchstate] = useState('');
  const [fetchedvideos, setFetchedvideos] = useState([]);

  const handleytSearch = async () => {
    const res = await ytSearch
      .get('/search', {
        params: {
          q: searchstate,
          maxResults: 5,
        },
      })
      .then((res) => setFetchedvideos(res.data.items))
      .catch((err) => console.log('Error in explore component', err));
  };

  return (
    <Container maxWidth="xs">
      <h1 style={{ color: 'rgba(0, 0, 0, 0.6)' }}>Explore Youtube Videos</h1>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleytSearch();
          }}
        >
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
            value={searchstate}
            onChange={(e) => {
              setSearchstate(e.target.value);
            }}
          />
        </form>
      </div>
      <Suspense fallback={<CircularProgress />}>
        <ExploreList videos={fetchedvideos} />
      </Suspense>
    </Container>
  );
}
