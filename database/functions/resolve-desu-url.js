const { Util } = require('odesus')
const { otakudesuUrl } = require('./emilia_setup.json')

module.exports = async (url) => {
  try {
    const originUrl = new URL(otakudesuUrl);
    const targetUrl = new URL(url);

    if (originUrl.hostname !== targetUrl.hostname) {
      return undefined;
    }
    
    targetUrl.search = '';
    targetUrl.hash = '';

    return Util.resolveSlug(targetUrl.href);
  } catch (error) {
    return undefined;
  }
};
