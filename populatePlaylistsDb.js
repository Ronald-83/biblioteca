#! /usr/bin/env node

console.log(
  'This script populates some test playlists and songs to your database. Specified database as argument - e.g.: node populatePlaylistsDb.js "mongodb+srv://cooluser:coolpassword@cluster0.cojoign.mongodb.net/local_library?retryWrites=true&w=majority&appName=Cluster0"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Playlist = require("./models/playlist");
const Song = require("./models/song");

const playlists = [];
const songs = [];

const mongoose = require("mongoose");

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createSongs();
  await createPlaylists();
  console.log("Debug: Closing mongoose");
  await mongoose.connection.close();
}

async function songCreate(index, name, artist, genre, year, rating, description, image_url) {
  const songdetail = {
    name: name,
    artist: artist,
    genre: genre,
    year: year,
    rating: rating,
  };
  if (description) songdetail.description = description;
  if (image_url) songdetail.image_url = image_url;

  const song = new Song(songdetail);
  await song.save();
  songs[index] = song;
  console.log(`Added song: ${name} by ${artist}`);
}

async function playlistCreate(index, name, description, songIds) {
  const playlistdetail = {
    name: name,
  };
  if (description) playlistdetail.description = description;
  if (songIds) playlistdetail.songs = songIds;

  const playlist = new Playlist(playlistdetail);
  await playlist.save();
  playlists[index] = playlist;
  console.log(`Added playlist: ${name}`);
}

async function createSongs() {
  console.log("Adding songs");
  await Promise.all([
    songCreate(
      0,
      "Bohemian Rhapsody",
      "Queen",
      "Rock",
      1975,
      5,
      "Epic rock opera masterpiece",
      "https://via.placeholder.com/200?text=Bohemian+Rhapsody"
    ),
    songCreate(
      1,
      "Imagine",
      "John Lennon",
      "Rock",
      1971,
      5,
      "Philosophical rock classic",
      "https://via.placeholder.com/200?text=Imagine"
    ),
    songCreate(
      2,
      "Stairway to Heaven",
      "Led Zeppelin",
      "Rock",
      1971,
      5,
      "Progressive rock legend",
      "https://via.placeholder.com/200?text=Stairway+to+Heaven"
    ),
    songCreate(
      3,
      "Hotel California",
      "Eagles",
      "Rock",
      1976,
      4.8,
      "Haunting and catchy rock song",
      "https://via.placeholder.com/200?text=Hotel+California"
    ),
    songCreate(
      4,
      "Blinding Lights",
      "The Weeknd",
      "Synthwave",
      2019,
      4.5,
      "Modern synthwave hit",
      "https://via.placeholder.com/200?text=Blinding+Lights"
    ),
    songCreate(
      5,
      "Shape of You",
      "Ed Sheeran",
      "Pop",
      2017,
      4,
      "Catchy pop song with percussion",
      "https://via.placeholder.com/200?text=Shape+of+You"
    ),
    songCreate(
      6,
      "Levitating",
      "Dua Lipa ft. DaBaby",
      "Disco-Pop",
      2020,
      4.3,
      "Feel-good disco-pop track",
      "https://via.placeholder.com/200?text=Levitating"
    ),
    songCreate(
      7,
      "Under Pressure",
      "Queen & David Bowie",
      "Rock",
      1981,
      4.7,
      "Iconic collaboration",
      "https://via.placeholder.com/200?text=Under+Pressure"
    ),
    songCreate(
      9,
      "Hey Jude",
      "The Beatles",
      "Rock",
      1968,
      5,
      "Timeless Beatles classic",
      "https://via.placeholder.com/200?text=Hey+Jude"
    ),
    songCreate(
      10,
      "Good as Hell",
      "Lizzo",
      "Hip-Hop/R&B",
      2016,
      4.4,
      "Uplifting self-love anthem",
      "https://via.placeholder.com/200?text=Good+as+Hell"
    ),
  ]);
}

async function createPlaylists() {
  console.log("Adding playlists");
  await Promise.all([
    playlistCreate(
      0,
      "Rock Classics",
      "Greatest rock songs of all time",
      [songs[0]._id, songs[1]._id, songs[2]._id, songs[3]._id, songs[7]._id, songs[8]._id]
    ),
    playlistCreate(
      1,
      "Modern Hits",
      "Contemporary popular songs",
      [songs[4]._id, songs[5]._id, songs[6]._id, songs[9]._id]
    ),
    playlistCreate(
      2,
      "Chill Vibes",
      "Relaxing music for unwinding",
      [songs[1]._id, songs[4]._id, songs[5]._id, songs[9]._id]
    ),
  ]);
}
