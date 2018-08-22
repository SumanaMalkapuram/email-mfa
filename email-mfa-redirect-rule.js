function performEmailMfa (user, context, callback) {
    var jwt = require('jsonwebtoken');
    console.log(configuration);
    
    if(context.connection !== 'your connection name') return callback(null, user, context);
    //check Email MFA is enabled for the client
    var CLIENTS_WITH_MFA = ['your clientid goes here!'];
  
    // run only for the specified clients
    if (CLIENTS_WITH_MFA.indexOf(context.clientID) === -1) {
      return callback(null, user, context);
    }
  
    //Returning from MFA validation
    if(context.protocol === 'redirect-callback') {
      var decoded = jwt.verify(context.request.query.id_token, Buffer.from(configuration.Email_MFA_TOKEN_SECRET, 'base64'));
      if(!decoded) return callback(new Error('Invalid Token'));
      if(decoded.status !== 'ok') return callback(new Error('Invalid Token Status'));
  
      return callback(null, user, context);
    }
  
    //CHECK FOR Email IDENTITY
    var email_connections = user.identities.filter(function (id) {
      return id.provider === 'email' && id.profileData && id.profileData.email_verified;
    });
    var token_payload = {};
  
    //IF NO Email IDENTITY, SKIP
    if (email_connections.length === 0) token_payload.email_identity = null;
    else token_payload.email_identity = email_connections[0];
    
  
    var token = jwt.sign(token_payload,
      Buffer.from(configuration.Email_MFA_TOKEN_SECRET, 'base64'),
      {
        subject: user.user_id,
        expiresInMinutes: 15,
        audience: context.clientID,
        issuer: 'urn:auth0:email:mfa'
      });
  
  
    //Trigger MFA
    context.redirect = {
      url: configuration.Email_MFA_URL + '?token=' + token // check this
    };
  
    callback(null,user,context);
    
  
  }