

```bash
yarn add gun
```

```bash
yarn add @capacitor-community/sqlite
```

```bash
yarn add flint
```

```bash
import { sqliteServ, dbVerServ, storageServ } from '../services/globalServices';
import { getGunSQLiteAdapter } from '@/composables/GunStorageAdapter';

const gunSQLiteAdapter = getGunSQLiteAdapter(sqliteServ, dbVerServ, storageServ);


let gun = Gun({
 
  peers: [enabledPeer.value],
  radisk: false,
  localStorage: false,
  gunSQLiteAdapter: {
    key: 'yourdatabase',
  },
});


//main

  gunSQLiteAdapter.initialize().then(() => {
    console.log('Gun SQLite adapter initialized and ready.');
  }).catch(err => {
    console.error('Failed to initialize Gun SQLite adapter:', err);
  });


```