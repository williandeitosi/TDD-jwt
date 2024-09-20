import request from 'supertest'
import app from '../server'
import { prisma } from '../app'

describe('register user', () => {
    beforeEach(async () => {
        await prisma.user.deleteMany()
    })

    it('Should verify Email and password formt invalid', async () => {
        const response = await request(app).post('/register').send({ name: 'willtest', password: 123 , email: 'test@email.com' })

        expect(response.status).toBe(400)
        expect(response.body.message).toBe('Invalid Email and Password format')
    })


    it('should return status code 200 for successful registration', async () => {
        const response = await request(app).post('/register').send({ name: 'willtest', password: 'passtest', email: 'test@email.com' })
        
        expect(response.status).toBe(200)
        expect(response.body.message).toBe('User registered successfully')
    })
    
    it('Should return status 400 for user is already exists', async () => {
        await request(app).post('/register').send({ name: 'willtest', password: 'passtest', email: 'test@email.com' })

        const response = await request(app).post('/register').send({ name: 'willtest', password: 'passtest', email: 'test@email.com' })

        expect(response.status).toBe(400)
        expect(response.body.message).toBe('User already exists')
    })


})