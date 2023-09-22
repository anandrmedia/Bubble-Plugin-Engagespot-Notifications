function(properties, context) {


const crypto = require('crypto');
const userId = context.currentUser.get('email');
const hash = crypto.createHmac('sha256', context.keys['X-ENGAGESPOT-API-SECRET'])
  .update(userId, 'utf8')
  .digest('base64');

return {
    signature:hash
}

}