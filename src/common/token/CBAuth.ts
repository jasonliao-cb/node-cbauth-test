import CBOAuth from 'node-cboauth';
import * as dotenv from 'dotenv';
dotenv.config();

export class CBAuth {
  oauth: any;
  constructor() {
    const endpoint = `${process.env.CB_API_ROOT}/oauth/token`;
    const oauthConfig: any = {
      clientId: process.env.CLIENT_ID,
      endpoint,
      sharedSecret: process.env.CLIENT_SECRET
    };
    this.oauth = new CBOAuth(oauthConfig);
  }

  async token() {
    return await this.oauth.getToken();
  }
}
