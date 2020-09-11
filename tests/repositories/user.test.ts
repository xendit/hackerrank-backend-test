import { Connection } from 'typeorm';
import { UserRepository } from 'src/repositories/user';
import { User } from 'src/entities/user';
import { createTestConnection } from '../helpers/connection';

describe('UserRepository', () => {
    let connection: Connection;

    beforeAll(async () => {
        connection = await createTestConnection();
        // Drops DB and re-creates schema
        await connection.dropDatabase();
        await connection.runMigrations();
    });

    afterAll(async () => {
        await connection.close();
    });

    beforeEach(async () => {
        await connection.getCustomRepository(UserRepository).clear();
    });

    describe('save()', () => {
        it('creates a row in db and is retrievable', async () => {
            const userRepository: UserRepository = connection.getCustomRepository(UserRepository);
            const user: User = await userRepository.save({
                firstName: 'John',
                lastName: 'Doe',
                address: 'My address',
                isActive: true
            });

            expect(user.firstName).toEqual('John');
            expect(user.lastName).toEqual('Doe');
            expect(user.isActive).toEqual(true);

            const users = await userRepository.find();
            expect(users).toHaveLength(1);

            expect(await userRepository.findOne(user.id)).toBeDefined();
        });
    });

    describe('findByName()', () => {
        it('can find a created user by name', async () => {
            const userRepository: UserRepository = connection.getCustomRepository(UserRepository);
            await userRepository.save({
                firstName: 'John',
                lastName: 'Doe',
                address: 'My address',
                isActive: true
            });

            const usersFoundByName = await userRepository.findByName('John', 'Doe');
            expect(usersFoundByName).toHaveLength(1);
            expect(usersFoundByName[0].firstName).toEqual('John');
            expect(usersFoundByName[0].lastName).toEqual('Doe');
        });
    });
});
