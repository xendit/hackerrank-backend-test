import 'reflect-metadata';
import { Response, Request } from 'express';

import { User } from 'src/entities/user';
import { UserService } from 'src/services/user';
import { UsersController } from 'src/controllers/user';

jest.mock('src/services/user');
const MockedUserService = UserService as jest.Mocked<typeof UserService>;
const mockedUserServiceInstance = new MockedUserService(null);

describe('UsersController', () => {
    const res = ({ status: undefined, json: undefined } as unknown) as Response;
    beforeEach(() => {
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
    });
    describe('GET /api/users', () => {
        it('should return 200 OK', async () => {
            mockedUserServiceInstance.findAll = jest.fn().mockReturnValueOnce([]);
            const controller = new UsersController(mockedUserServiceInstance);
            await controller.get({} as Request, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith([]);
        });
    });

    describe('GET /api/users/:id', () => {
        it('should return 200 OK on success', async () => {
            const mockUser = new User();
            mockedUserServiceInstance.findOne = jest.fn().mockReturnValueOnce(mockUser);

            const controller = new UsersController(mockedUserServiceInstance);
            await controller.getById(({ params: { id: '123' } } as unknown) as Request, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockUser);
        });
    });
});
