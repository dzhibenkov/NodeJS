import { App } from './app';
import { LoggerService } from './logger/logger-service';
import { UserController } from './users/user-controller';
import { ExeptionFilter } from './errors/exeption-filter';
import { Container, ContainerModule, interfaces } from 'inversify';
import { TYPES } from './types';
import { IExeptionFilter } from './errors/exeption-filter-interface';
import { ILogger } from './logger/logger-interface';
import { IUserController } from './users/user-controller-interface';
import { IUserService } from './users/user-service-interface';
import { UserService } from './users/user-service';
import { IConfigService } from './config/config-service-interface';
import { ConfigService } from './config/config-service';
import { PrismaService } from './database/prisma-service';
import { UsersRepository } from './users/users-repository';
import { IUsersRepository } from './users/users-repository-interface';

export interface IBootstrapReturn {
	appContainer: Container;
	app: App;
}

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();
	bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter).inSingletonScope();
	bind<IUserController>(TYPES.UserController).to(UserController).inSingletonScope();
	bind<IUserService>(TYPES.UserService).to(UserService).inSingletonScope();
	bind<IUsersRepository>(TYPES.UsersRepository).to(UsersRepository).inSingletonScope();
	bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
	bind<PrismaService>(TYPES.PrismaService).to(PrismaService).inSingletonScope();
	bind<App>(TYPES.Application).to(App).inSingletonScope();
});

async function bootstrap(): Promise<IBootstrapReturn> {
	const appContainer = new Container();
	appContainer.load(appBindings);

	const app = appContainer.get<App>(TYPES.Application);
	await app.init();

	return { appContainer, app };
}

export const boot = bootstrap();
