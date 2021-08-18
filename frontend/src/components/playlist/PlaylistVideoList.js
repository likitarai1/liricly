import React from 'react';
// import PlaylistVideoItem from './PlaylistVideoItem';
import { lazy } from 'react';
const PlaylistVideoItem = lazy(() => import('./PlaylistVideoItem'));

export default function PlaylistVideoList({ videoDetails }) {
  const videodata = JSON.parse(videoDetails);

  return <PlaylistVideoItem videodata={videodata} />;
}
