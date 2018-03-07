import { Container } from "inversify";
import { interfaces, InversifyExpressServer, TYPE } from 'inversify-express-utils';
import Controller from "./Controller";
import GeneratorInterface from './Service/GeneratorInterface';
import Generator from "./Service/Generator";

const container = new Container();

// Register Controllers.
container.bind<interfaces.Controller>(TYPE.Controller).to(Controller).whenTargetNamed("OAuthController");

// Register Services.
container.bind<GeneratorInterface>("Generator").to(Generator).inSingletonScope();

export default container;