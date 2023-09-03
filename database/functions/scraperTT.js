/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-param-reassign */
const axios = require("axios");

async function getVideoId(link) {
  const response = await axios.get(link);
  link = response.request.res.responseUrl;
  return new URL(link).pathname.match(/\/(\d+)/)[1];
}

async function tiktokDL(url) {
  const videoId = await getVideoId(url);
  const { data } = await axios.get(`https://api16-core-c-useast1a.tiktokv.com/aweme/v1/feed/?aweme_id=${videoId}`);
  return data.aweme_list.find((x) => x.aweme_id === videoId);
}

module.exports = {
  tiktokDL,
};
