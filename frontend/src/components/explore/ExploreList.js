import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import { lazy } from 'react';
const ExploreItem = lazy(() => import('./ExploreItem'));

const useStyles = makeStyles((theme) => ({
  exploreList: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ExploreList({ videos }) {
  const classes = useStyles();

  const renderVideos = videos.map((video) => {
    return <ExploreItem key={video.id.videoId} video={video} />;
  });

  return <List className={classes.exploreList}>{renderVideos}</List>;
}
