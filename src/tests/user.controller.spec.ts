import request from 'supertest'
import app from '../server'

describe('register user', () => {
    it('should return status code 200 for successful registration', async () => {
        const response = await request(app).post('/register').send({ name: 'willtest', password: 'passtest' })

        expect(response.status).toBe(200)
        expect(response.body.message).toBe('User registered successfully')
    })
})