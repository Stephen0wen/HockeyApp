const format = require("pg-format");
const db = require("../connection");

const seed = ({
  fixturesData,
  responsesData,
  rolesData,
  teamsData,
  usersData,
  venuesData,
}) => {
  return db
    .query(`DROP TABLE IF EXISTS responses;`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS fixtures;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS roles;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS users;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS teams;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS venues;`);
    })
    .then(() => {
      return db.query(`
        CREATE TABLE venues (
          venue_id SERIAL PRIMARY KEY,
          venue_name VARCHAR NOT NULL,
          venue_address_1 VARCHAR NOT NULL,
          venue_address_2 VARCHAR NOT NULL,
          venue_postcode VARCHAR,
          venue_phone VARCHAR,
          venue_latitude FLOAT,
          venue_longitude FLOAT
        );`);
    })
    .then(() => {
      return db.query(`
        CREATE TABLE teams (
          team_id SERIAL PRIMARY KEY,
          team_name VARCHAR NOT NULL,
          venue_id INT REFERENCES venues(venue_id) NOT NULL,
          team_start_time INT NOT NULL,
          team_division VARCHAR NOT NULL,  
        );`);
    })
    .then(() => {
      return db.query(`
        CREATE TABLE users (
          user_id SERIAL PRIMARY KEY,
          team_id INT REFERENCES teams(team_id) NOT NULL,
          user_name VARCHAR NOT NULL,
          user_address_1 VARCHAR NOT NULL,
          user_address_2 VARCHAR NOT NULL,
          user_postcode VARCHAR,
          user_dob DATE NOT NULL,
          user_phone VARCHAR
        )
      `);
    })
    .then(() => {
      return db.query(`
        CREATE TABLE roles (
          user_id INT REFERENCES users(user_id) NOT NULL,
          player_bool BOOL,
          secretary_bool BOOL,
          umpire_bool BOOL,
          organiser_bool BOOL
      )
    `);
    })
    .then(() => {
      return db.query(`
        CREATE TABLE fixtures (
          fixture_id SERIAL PRIMARY KEY,
          match_status VARCHAR NOT NULL,
          team1_id INT REFERENCES teams(team_id) NOT NULL,
          team2_id INT REFERENCES teams(team_id) NOT NULL,
          team1_score INT NOT NULL,
          team2_score INT NOT NULL,
          venue_id INT REFERENCES venues(venue_id) NOT NULL,
          match_date DATE NOT NULL
        )
      `);
    })
    .then(() => {
      return db.query(`
      CREATE TABLE responses (
        response_id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(user_id) NOT NULL,
        fixture_id INT REFERENCES fixtures(fixtures_id) NOT NULL,
        response VARCHAR NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      )
      `);
    });
};

//`.Responses
//Fixtures
//Roles
//Users
//Teams
//Venues
