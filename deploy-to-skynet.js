import { SkynetClient, genKeyPairFromSeed } from '@skynetlabs/skynet-nodejs';
import 'dotenv/config'

/* global process */

deployToSkynet()

export async function deployToSkynet({
  APIKey = process.env.SKYNET_API_KEY,
  seed = process.env.SECRET_SEED,
  dataKey = 'Gun-Vue',
  dir = "./_dist"
} = {}) {
  const client = new SkynetClient('https://siasky.net', { APIKey })
  const { privateKey, publicKey } = genKeyPairFromSeed(seed);
  const skylink = await client.uploadDirectory(dir);
  console.log(`Upload successful, url: ${skylink}`);
  await client.db.setDataLink(privateKey, dataKey, skylink);
  const resolverSkylink = await client.registry.getEntryLink(publicKey, dataKey);
  const resolverSkylinkUrl = await client.getSkylinkUrl(resolverSkylink)
  console.log('Link: ' + resolverSkylink)
  console.log('URL: ' + resolverSkylinkUrl)
}