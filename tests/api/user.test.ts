import request from 'supertest';
import { getCustomRepository, Repository, getConnection } from 'typeorm';

import { createApp } from 'src/app';
import { UserRepository } from 'src/repositories/user';
import { User } from 'src/entities/user';

describe('Users controller integration tests', () => {
    let server: Express.Application;
    let userRepository: Repository<User>;

    const REQUIRED_HEADERS = { 'client-version': 'v0.0.0', 'team-name': 'test', 'service-name': 'local' };
    beforeAll(async () => {
        server = await createApp();
        await getConnection().dropDatabase();
        await getConnection().runMigrations();
        userRepository = getCustomRepository(UserRepository);
    });

    afterAll(async () => {
        await getConnection('default').close();
    });

    beforeEach(async () => {
        await userRepository.clear();
    });

    describe('GET /api/users', () => {
        it('returns 400 without headers', async () => {
            const response = await request(server).get('/api/users');
            expect(response.status).toBe(400);
            expect(response.body.error_code).toEqual('API_VALIDATION_ERROR');
        });
        it('returns 200 with headers', async () => {
            const response = await request(server).get('/api/users').set(REQUIRED_HEADERS);
            expect(response.status).toBe(200);
            expect(response.body).toEqual([]);
        });
    });
    describe('POST /api/users', () => {
        it('returns 400 without headers', async () => {
            const response = await request(server).post('/api/users').send({
                firstName: 'John',
                lastName: 'Doe',
                address: 'Singapore',
                isActive: true
            });
            expect(response.status).toBe(400);
            expect(response.body.error_code).toEqual('API_VALIDATION_ERROR');
        });
        it('returns 400 with missing required fields', async () => {
            const response = await request(server)
                .post('/api/users')
                .send({
                    lastName: 'Doe',
                    address: 'Singapore',
                    isActive: true
                })
                .set(REQUIRED_HEADERS);
            expect(response.status).toBe(400);
            expect(response.body.error_code).toEqual('API_VALIDATION_ERROR');
        });
        it('returns 400 with incorrect field type', async () => {
            const response = await request(server)
                .post('/api/users')
                .send({
                    firstName: 'John',
                    lastName: 'Doe',
                    address: 'Singapore',
                    isActive: 'potato'
                })
                .set(REQUIRED_HEADERS);
            expect(response.status).toBe(400);
            expect(response.body.error_code).toEqual('API_VALIDATION_ERROR');
        });
        it('returns 200', async () => {
            const response = await request(server)
                .post('/api/users')
                .send({
                    firstName: 'John',
                    lastName: 'Doe',
                    address: 'Singapore',
                    isActive: true
                })
                .set(REQUIRED_HEADERS);
            expect(response.status).toBe(200);
            expect(response.body.id).toBeDefined();
            expect(response.body.firstName).toEqual('John');
            expect(response.body.lastName).toEqual('Doe');
            expect(response.body.address).toEqual('Singapore');
            expect(response.body.isActive).toEqual(true);
        });
    });
    describe('GET /api/users/:id', () => {
        it('returns 400 without headers', async () => {
            const existingUser = await userRepository.save({
                firstName: 'YC',
                lastName: 'Toh',
                address: 'Xendit',
                isActive: true
            });
            const response = await request(server).get(`/api/users/${existingUser.id}`);
            expect(response.status).toBe(400);
            expect(response.body.error_code).toEqual('API_VALIDATION_ERROR');
        });
        it('returns 200', async () => {
            const existingUser = await userRepository.save({
                firstName: 'YC',
                lastName: 'Toh',
                address: 'Xendit',
                isActive: true
            });
            const response = await request(server).get(`/api/users/${existingUser.id}`).set(REQUIRED_HEADERS);
            expect(response.status).toBe(200);
            expect(response.body.id).toBeDefined();
            expect(response.body.firstName).toEqual(existingUser.firstName);
            expect(response.body.lastName).toEqual(existingUser.lastName);
            expect(response.body.address).toEqual(existingUser.address);
            expect(response.body.isActive).toEqual(existingUser.isActive);
        });
    });
    describe('PUT /api/users/:id', () => {
        it('returns 400 without headers', async () => {
            const existingUser = await userRepository.save({
                firstName: 'YC',
                lastName: 'Toh',
                address: 'Xendit',
                isActive: true
            });
            const response = await request(server).put(`/api/users/${existingUser.id}`).send({
                firstName: 'John',
                lastName: 'Doe',
                address: 'Singapore',
                isActive: true
            });
            expect(response.status).toBe(400);
            expect(response.body.error_code).toEqual('API_VALIDATION_ERROR');
        });
        it('returns 200', async () => {
            const existingUser = await userRepository.save({
                firstName: 'YC',
                lastName: 'Toh',
                address: 'Xendit',
                isActive: true
            });
            const response = await request(server)
                .put(`/api/users/${existingUser.id}`)
                .send({
                    firstName: 'John',
                    lastName: 'Doe',
                    address: 'Singapore',
                    isActive: true
                })
                .set(REQUIRED_HEADERS);
            expect(response.status).toBe(200);
            expect(response.body.id).toBeDefined();
            expect(response.body.firstName).toEqual('John');
            expect(response.body.lastName).toEqual('Doe');
            expect(response.body.address).toEqual('Singapore');
            expect(response.body.isActive).toEqual(true);
        });
    });
    describe('DELETE /api/users/:id', () => {
        it('returns 200', async () => {
            const existingUser = await userRepository.save({
                firstName: 'YC',
                lastName: 'Toh',
                address: 'Xendit',
                isActive: true
            });
            const response = await request(server).delete(`/api/users/${existingUser.id}`);
            expect(response.status).toBe(200);
        });
    });
});
