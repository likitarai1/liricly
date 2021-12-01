const express = require('express');
const router = express.Router();
const db = require('../connection');

router.get('/getplaylists/:username', (req, res) => {
  const username = req.params.username;

  db.query(
    'SELECT idplaylist,playlistName FROM playlist WHERE user=?',
    [username],
    (err, result) => {
      if (err) {
        console.log('playlist route error :: ', err);
      } else {
        res.send({ result: result });
      }
    }
  );
});

router.post('/create', (req, res) => {
  const username = req.body.username;
  const playlistname = req.body.playlistname;

  db.query(
    'INSERT INTO playlist (user, playlistName) VALUES (?,?)',
    [username, playlistname],
    (err, result) => {
      if (err) {
        console.log('playlist route error :: ', err);
      } else {
        console.log('playlist route result ', result);
      }
    }
  );
});

router.patch('/playlistName', (req, res) => {
  const data = {
    newname: req.body.newplaylistname,
    id: req.body.playlistid,
  };
  console.log('whats patch body ', data);
  // db.query(
  //   'UPDATE playlist SET playlistName=? WHERE idplaylist=?',
  //   [data.newname, data.id],
  //   (err, result) => {
  //     if (err) {
  //       console.log('playlist name patch :: ', err);
  //     } else {
  //       console.log('playlist name updated', result);
  //     }
  //   }
  // );
});

router.delete('/', (req, res) => {
  const data = {
    id: req.body.playlistid,
  };
  db.query('DELETE FROM playlist WHERE idplaylist=?', [data.id], (err, result) => {
    if (err) {
      console.log('playlist delete err :: ', err);
    } else {
      console.log('playlist deleted', result);
    }
  });
});

router.post('/addvideoInplaylist', (req, res) => {
  const vdtls = req.body.vdtls;
  const playlistname = req.body.pName;
  const username = req.body.username;

  db.query(
    `INSERT INTO playlistvideos (uname, playlistName, videoDetails) VALUES (?,?,?)`,
    [username, playlistname, vdtls],
    (err, result) => {
      if (err) {
        console.log('playlist addvideoInplaylist route error :: ', err);
      } else {
        console.log('playlist addvideoInplaylist route result ', result);
      }
    }
  );
});

router.get('/particularplaylist', (req, res) => {
  const username = req.query.username;
  const playlistname = req.query.playlistname;
  db.query(
    'SELECT videoDetails FROM playlistvideos WHERE uname=(?) AND playlistName=(?)',
    [username, playlistname],
    (err, result) => {
      if (err) {
        console.log('errorrr :P ', err);
      } else {
        res.send({ response: result });
      }
    }
  );
});

module.exports = router;
