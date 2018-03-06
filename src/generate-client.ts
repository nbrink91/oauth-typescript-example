import "reflect-metadata";
import db from './db';
import container from './container';
import GeneratorInterface from './Service/GeneratorInterface'

const generator = container.get<GeneratorInterface>("Generator");

db.then(() => generator.client().then(console.log));
