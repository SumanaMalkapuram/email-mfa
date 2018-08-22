# email-mfa


### TO DO - Add documentation

-- Make sure passwordless with email as a connection is enabled
-- Create a Management API Machine to Machine client with scopes required to get a user, create a user and link accounts. Look at the management api docs at https://auth0.com/docs/api/management/v2#!/Users/get_users
-- Note the client_id and client_secret for Machine to Machine client created above
-- Initialize the webtask container within your Auth0 tenant
-- In Mac, in a terminal create a random secret example : openssl rand 32 -base64, note this secret


```
wt create --name email-mfa --secret token_secret=<secret created in step above> --secret auth0_domain=<tenant>.auth0.com --secret management_api_client_id=<client_id_mgmt_api> --secret management_api_client_secret=<client_secret_mgmt_api> --profile "tenant-default" email-mfa-wt.js
```

-- Note the url created from the command above
-- Create 2 configuration entries for Auth0 rules
    > configuration.Email_MFA_URL => Email_MFA_URL is the url noted above
    > configuration.Email_MFA_TOKEN_SECRET => Email_MFA_TOKEN_SECRET is the secret created above and used as token_secret in the wt create command

-- Copy the rule src code from `email-mfa-redirect-rule.js` and create a new rule and name it `Email MFA`