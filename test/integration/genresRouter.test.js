/* eslint-disable no-undef */
const dotenv = require('dotenv');

dotenv.config();

const { Pool } = require('pg');
const supertest = require('supertest');
const sequelize = require('../../src/utils/database');

require('../../src/utils/loadRelationships');

const app = require('../../src/app');

const test = supertest(app);
const db = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function cleanDataBase() {
  await db.query('DELETE FROM "recommendationsGenres";');
  await db.query('DELETE FROM recommendations;');
  await db.query('DELETE FROM genres;');
}

beforeEach(async () => {
  await cleanDataBase();
});

afterAll(async () => {
  await db.end();
  await sequelize.close();
});

describe('POST /genres', () => {
  it("Should response status 201 when the name isn't registred", async () => {
    const body = {
      name: 'SummerEletroHits 2008',
    };
    const response = await test.post('/genres').send(body);
    expect(response.status).toBe(201);
  });

  it("Should response status 422 when the name isn't a string", async () => {
    const body = {
      name: 120,
    };
    const response = await test.post('/genres').send(body);
    expect(response.status).toBe(422);
  });

  it('Should response status 409 when the name its alredy registred', async () => {
    const body = {
      name: 'Funk',
    };

    await db.query("INSERT INTO genres (name) VALUES ('Funk');");

    const response = await test.post('/genres').send(body);
    expect(response.status).toBe(409);
  });
});

describe('GET /genres', () => {
  it('Should response status 200', async () => {
    const response = await test.get('/genres');
    expect(response.status).toBe(200);
  });
});
