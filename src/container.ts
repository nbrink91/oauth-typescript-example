import { Container } from "inversify";
import GeneratorInterface from './Service/GeneratorInterface';
import GeneratorMock from "./Service/GeneratorMock";

const container = new Container();
container.bind<GeneratorInterface>(GeneratorMock).toSelf();

export default container;