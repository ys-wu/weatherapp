/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src/index');

chai.should();

chai.use(chaiHttp);

const coords = {
  latitude: 60.1674881,
  longitude: 24.9427473,
};

describe('POST /api/weather', () => {
  it('It should send back weather', (done) => {
    chai.request(server)
      .post('/api/current')
      .send(coords)
      .end((_err, response) => {
        response.should.have.status(200);
        response.body.should.be.a('object');
        response.body.should.have.property('country');
        response.body.should.have.property('city');
        response.body.should.have.property('description');
        response.body.should.have.property('icon');
        response.body.should.have.property('temp');
        response.body.should.have.property('tempMin');
        response.body.should.have.property('tempMax');
        done();
      });
  });
});

describe('POST /api/forecast', () => {
  it('It should send back forecast', (done) => {
    chai.request(server)
      .post('/api/forecast')
      .send(coords)
      .end((_err, response) => {
        response.should.have.status(200);
        response.body.should.be.a('array').have.length(40);
        response.body[0].should.be.a('object');
        response.body[0].should.have.property('key');
        response.body[0].should.have.property('datetime');
        response.body[0].should.have.property('icon');
        response.body[0].should.have.property('icon');
        response.body[0].should.have.property('temp');
        done();
      });
  });
});
