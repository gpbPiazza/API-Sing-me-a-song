/* eslint-disable no-undef */
const dotenv = require('dotenv');

dotenv.config();

const { Pool } = require('pg');
const supertest = require('supertest');
const sequelize = require('../src/utils/database');

require('../src/utils/loadRelationships');

const app = require('../src/app');

const test = supertest(app);
const db = new Pool({
  connectionString: process.env.DATABASE_URL,
});

let genreId;
let recommendationId;

async function cleanDataBase() {
  await db.query('DELETE FROM recomendationsGenres;');
  await db.query('DELETE FROM recommendations;');
  await db.query('DELETE FROM genres;');
}

beforeAll(async () => {
  await cleanDataBase();
});

afterAll(async () => {
  await db.end();
  await sequelize.close();
});

describe('POST /genres', () => {
  it("Should response status 201 when the name isn't registred", async () => {
    const body = {
      name: 'forrózão dos crias',
    };
    const response = await test.post('/genres').send(body);
    genreId = response.body.id;
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
      name: 'forrózão dos crias',
    };
    const response = await test.post('/genres').send(body);
    expect(response.status).toBe(409);
  });
});

describe('GET /genres', () => {
  it('Should response status 200 when the user have internet', async () => {
    const response = await test.get('/genres');
    expect(response.status).toBe(200);
  });
});

describe('POST /recommendations', () => {
  it('Should response status 201 when name its a string, youTubeLink does come from youtube and genresIds exists', async () => {
    const body = {
      name: 'zape',
      genresIds: [genreId],
      youtubeLink: 'https://www.youtube.com/watch?v=pJuQylOmMrQ&list=RDMMpJuQylOmMrQ&start_radio=1&ab_channel=MarcRebillet',
    };
    const response = await test.post('/recommendations').send(body);
    recommendationId = response.body.id;
    expect(response.status).toBe(201);
  });

  it('Should response status 422 when youTubeLink does not come from youtube', async () => {
    const body = {
      name: 'zape',
      genresIds: [genreId],
      youtubeLink: 'https://www.notion.so/Projeto-015-API-Sing-Me-a-Song-49b593fc056b4ebeb7ad26b3ab65f224',
    };
    const response = await test.post('/recommendations').send(body);
    expect(response.status).toBe(422);
  });

  it('Should response status 404 when genresIds are invalid', async () => {
    const body = {
      name: 'zape',
      genresIds: [22, 'zape', 30],
      youtubeLink: 'https://www.notion.so/Projeto-015-API-Sing-Me-a-Song-49b593fc056b4ebeb7ad26b3ab65f224',
    };
    const response = await test.post('/recommendations').send(body);
    expect(response.status).toBe(404);
  });
});

describe('POST /recommendations/:id/upvote', () => {
  it('Should response status 200 when the recommendation exists', async () => {
    const response = await test.post(`/recommendations/${recommendationId}/upvote`);
    expect(response.status).toBe(200);
  });

  it('Should response status 404 when the recommendation does not exists', async () => {
    const response = await test.post('/recommendations/120120/upvote');
    expect(response.status).toBe(404);
  });
});

describe('POST /recommendations/:id/donwvote', () => {
  it('Should response status 200 when the recommendation exists and have score bigger than -5', async () => {
    const response = await test.post(`/recommendations/${recommendationId}/donwvote`);
    expect(response.status).toBe(200);
  });

  it('Should response status 404 when the recommendation does not exists or score  is less than -5', async () => {
    const response = await test.post('/recommendations/120120/donwvote');
    expect(response.status).toBe(404);
  });
});
