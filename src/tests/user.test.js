import { logger } from "../application/logging.js";
import { web } from "../application/web.js";
import { removeTestUser } from "./test-utils.js"
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