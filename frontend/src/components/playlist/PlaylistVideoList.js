import React from 'react';
import PlaylistVideoItem from './PlaylistVideoItem';

export default function PlaylistVideoList({ videoDetails }) {
  const videodata = JSON.parse(videoDetails);

  return <PlaylistVideoItem videodata={videodata} />;
}
