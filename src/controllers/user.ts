import { Router } from 'express';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IUserService {}

export class UsersController {
    private readonly userService: IUserService;

    private router: Router;

    public constructor(userService: IUserService) {
        this.router = Router();
        this.userService = userService;
    }

    getRouter() {
        return this.router;
    }
}
