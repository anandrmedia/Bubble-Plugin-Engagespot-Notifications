async function(properties, context) {
    const jwt = require('jsonwebtoken');
    
    const email = await context.currentUser.get('email');
    const apiKey = context.keys['X-ENGAGESPOT-API-KEY'];
    const privateKey = Buffer.from(context.keys['OPTIONAL-SIGNING-KEY-BASE64'], 'base64').toString('utf8');

    const payload = {
      sub: 'user:'+email,
      apiKey,
      iat: Math.floor(Date.now() / 1000),
    };
    
    const token = jwt.sign(payload, privateKey, { algorithm: 'RS256' });

    return {
        token
    }
}