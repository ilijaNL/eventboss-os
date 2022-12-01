import fs from 'fs';
import { join } from 'path';

const isTsNode = Symbol.for('ts-node.register.instance') in process || !!process.env.TS_NODE_DEV;
const typescriptSupport = isTsNode;

const typescriptPattern = /\.ts$/i;

function getScriptType(fname: string) {
  return typescriptPattern.test(fname) ? 'typescript' : 'commonjs';
}

interface IMap<T> {
  (name: string, filepath: string): T;
}
interface IFilter {
  (...args: any[]): any;
}

interface IOptions {
  excludeDirs?: string | RegExp;
  dirname: string;
  filter?: string | RegExp | IFilter;
  recursive?: boolean;
  resolve?: (resp: any) => any;
  map?: IMap<string>;
}

const DEFAULT_EXCLUDE_DIR = /^\./;
const DEFAULT_FILTER = /^([^\.].*)\.(j|t)s(on)?$/;
const DEFAULT_RECURSIVE = true;

const importDefault = function (mod: any) {
  return mod && mod.__esModule ? mod : { default: mod };
};

function requireAll(options: IOptions) {
  const dirname = options.dirname;
  const excludeDirs = options.excludeDirs === undefined ? DEFAULT_EXCLUDE_DIR : options.excludeDirs;
  const filter = options.filter === undefined ? DEFAULT_FILTER : options.filter;
  let modules: { [k: string]: any } = {};
  const recursive = options.recursive === undefined ? DEFAULT_RECURSIVE : options.recursive;
  const resolve = options.resolve ?? identity;
  const map = options.map ?? identity;

  function excludeDirectory(dirname: string) {
    return !recursive || (excludeDirs && dirname.match(excludeDirs));
  }

  function filterFile(filename: string) {
    if (typeof filter === 'function') {
      return filter(filename);
    }

    const match = filename.match(filter);
    if (!match) return;

    console.log({ match });

    return match[1] || match[0];
  }

  const files = fs.readdirSync(dirname);

  files.forEach((file) => {
    const filepath = join(dirname, file);
    if (fs.statSync(filepath).isDirectory()) {
      if (excludeDirectory(file)) return;
      const subModules = requireAll({
        dirname: filepath,
        filter: filter,
        excludeDirs: excludeDirs,
        map: map,
        resolve: resolve,
      });

      if (!subModules || Object.keys(subModules).length === 0) return;

      // modules[map(file, filepath)] = subModules;
      modules = {
        ...subModules,
        ...modules,
      };
    } else {
      const type = getScriptType(file);
      if (type === 'typescript' && !typescriptSupport) {
        return;
      }

      const name = filterFile(file);
      if (!name) return;

      modules[map(name, filepath)] = resolve(importDefault(require(filepath)));
    }
  });

  return modules;
}

function identity(val: string): string {
  return val;
}

export function requireAllDefaults<T>(options: IOptions): T[] {
  const handlers = requireAll(options);
  const listeners = Object.values(handlers).map((h) => h.default);
  return listeners;
}

export default requireAll;
