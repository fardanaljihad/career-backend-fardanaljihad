import { logger } from "../application/logging.js";
import { web } from "../application/web.js";
import { removeTestUser, createTestUser } from "./test-utils.js"
import supertest from "supertest";

describe('POST /api/users', function() {

    afterEach(async () => {
        await removeTestUser();
    })

    it('creates a new user when given valid input', async () => {
        const result = await supertest(web)
            .post('/api/users')
            .send({
                name: 'Test User',
                username: 'test-user',
                password: 'password'
            });

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.name).toBe('Test User');
        expect(result.body.data.username).toBe('test-user');
        expect(result.body.data.password).toBeUndefined();
    });

    it('rejects registration when the username is already taken', async () => {
        let result = await supertest(web)
            .post('/api/users')
            .send({
                name: 'Test User',
                username: 'test-user',
                password: 'password'
            });

        result = await supertest(web)
            .post('/api/users')
            .send({
                name: 'Test User',
                username: 'test-user',
                password: 'password'
            });

        logger.info(result.body);
        
        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('rejects registration when the request is not valid', async () => {
        const result = await supertest(web)
            .post('/api/users')
            .send({
                name: '',
                username: 'test-user',
                password: 'password'
            });

        logger.info(result.body);

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    })
})

describe('POST /api/users/login', function() {
    
    beforeEach(async () => {
        await createTestUser();
    })

    afterEach(async () => {
        await removeTestUser();
    })

    it('log in successfully with valid credentials', async () => {
        const result = await supertest(web)
            .post('/api/users/login')
            .send({
                username: 'test-user',
                password: 'password'
            });

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.token).toBeDefined();
        expect(result.body.data.token).not.toBe('token');
    })

    it('rejects login when the request is invalid', async () => {
        const result = await supertest(web)
            .post('/api/users/login')
            .send({
                username: '',
                password: ''
            });

        logger.info(result.body);

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    })

    it('rejects login when the password is wrong', async () => {
        const result = await supertest(web)
            .post('/api/users/login')
            .send({
                username: 'test-user',
                password: '123'
            });

        logger.info(result.body);

        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    })

    it('rejects login when the username does not exist', async () => {
        const result = await supertest(web)
            .post('/api/users/login')
            .send({
                username: 'user',
                password: 'password'
            });

        logger.info(result.body);

        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    })
})
