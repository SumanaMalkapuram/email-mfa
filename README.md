# email-mfa


### TO DO - Add documentation

```
wt create --name email-mfa --secret token_secret=`openssl rand 32 -base64` --secret auth0_domain=<tenant>.auth0.com --secret management_api_client_id=<client_id_mgmt_api> --secret management_api_client_secret=<client_secret_mgmt_api> --profile "tenant-default" email-mfa-wt.js
```