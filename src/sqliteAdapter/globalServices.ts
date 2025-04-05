import SQLiteService from './sqliteService';
import DbVersionService from './dbVersionService';
import StorageService from './storageService';

const sqliteServ = new SQLiteService();
const dbVerServ = new DbVersionService();
const storageServ = new StorageService(sqliteServ, dbVerServ);//init db  and  db version 

export { sqliteServ, dbVerServ, storageServ };