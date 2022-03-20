import { SkynetClient, genKeyPairFromSeed } from '@skynetlabs/skynet-nodejs';
import 'dotenv/config'

const client = new SkynetClient('https://siasky.net', { APIKey: process.env.SKYNET_API_KEY })

const { privateKey, publicKey } = genKeyPairFromSeed(process.env.SECRET_SEED);
const dataKey = 'Gun-Vue'

sia://fANEdzdRRRqEO8nZckaXcMNMY_tp-cmDVDCPoNCo9Jn0Sw

(async () => {
  const skylink = await client.uploadDirectory("./_dist");
  console.log(`Upload successful, url: ${skylink}`);
  await client.db.setDataLink(privateKey, dataKey, skylink);
  const resolverSkylink = await client.registry.getEntryLink(publicKey, dataKey);
  const resolverSkylinkUrl = await client.getSkylinkUrl(resolverSkylink)
  console.log('Link: ' + resolverSkylink)
  console.log('URL: ' + resolverSkylinkUrl)
})();
