import "reflect-metadata";
import db from './db';
import container from './container';
import Generator from './Service/Generator';
import GeneratorInterface from './Service/GeneratorInterface';
import GeneratorMock from "./Service/GeneratorMock";

const generator = container.get<Generator>(GeneratorMock);

db.then(() => generator.client().then(console.log));
