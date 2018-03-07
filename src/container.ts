import { Container } from "inversify";
import GeneratorInterface from './Service/GeneratorInterface';
import Generator from "./Service/Generator";

const container = new Container();
container.bind<GeneratorInterface>("Generator").to(Generator).inSingletonScope();

export default container;