import { AbstractLevelDOWN } from 'abstract-leveldown';
import levelup, { LevelUp } from 'levelup';
import MemDownConstructor from 'memdown';

export type DB<K, V> = LevelUp<AbstractLevelDOWN<K, V>>;
export type StringDB = DB<string, string>;

// This was reporting jest as a browser....
// const isBrowser = () => typeof window !== "undefined" && typeof window.document !== "undefined";
const isNode = (): boolean =>
  typeof process === 'object' && !(process as any).browser;
const isBrowser = (): boolean => !isNode();

export function createMemDb(): StringDB {
  return levelup(MemDownConstructor<string, string>());
}

export function createBrowserDb(name: string): StringDB {
  import encode = require('encoding-down');
  import leveljs = require('level-js');
  return levelup(encode(leveljs(name)));
}

// placeholder to be read from configuration later
export const createDb = (name: string): StringDB =>
  isBrowser() ? createBrowserDb(name) : createMemDb();

interface TypeError {
  readonly notFound: boolean;
}
const isNotFoundError = (err: TypeError): boolean => err && err.notFound;

export async function hasDbKey(db: StringDB, key: string): Promise<boolean> {
  try {
    await db.get(key);
    return true;
  } catch (err) {
    if (isNotFoundError(err)) {
      return false;
    }
    throw err;
  }
}
