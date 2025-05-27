import { faker } from '@faker-js/faker';
import { UUID } from 'crypto';
import { Center } from '../../entity/center';

describe('Center Entity', () => {
  it('deve criar um centro válido', () => {
    const name = faker.company.name();
    const address = faker.location.streetAddress();
    const latitude = faker.location.latitude({ min: -90, max: 90 });
    const longitude = faker.location.longitude({ min: -180, max: 180 });

    const center = new Center({
      id: faker.string.uuid() as UUID,
      name,
      address,
      latitude,
      longitude,
    });

    expect(center.name).toBe(name);
    expect(center.address).toBe(address);
    expect(center.getLatitude()).toBe(latitude);
    expect(center.getLongitude()).toBe(longitude);
    expect(center.id).toBeDefined();
  });

  it('deve marcar erro se nome for vazio', () => {
    const center = new Center({
      name: '',
      address: faker.location.streetAddress(),
    });
    expect(center.validation.hasError).toBe(true);
  });

  it('deve criar um centro inválido se endereço for vazio', () => {
    const center = new Center({
      name: faker.company.name(),
      address: '',
    });
    expect(center.validation.hasError).toBe(true);
  });

  it('deve permitir latitude e longitude opcionais', () => {
    const center = new Center({
      name: faker.company.name(),
      address: faker.location.streetAddress(),
    });

    expect(center.getLatitude()).toBeFalsy();
    expect(center.getLongitude()).toBeFalsy();
  });

  it('deve atualizar os dados do centro corretamente', () => {
    const center = new Center({
      name: faker.company.name(),
      address: faker.location.streetAddress(),
    });

    const newName = faker.company.name();
    const newAddress = faker.location.streetAddress();
    const newLatitude = faker.location.latitude({ min: -90, max: 90 });
    const newLongitude = faker.location.longitude({ min: -180, max: 180 });

    center.name = newName;
    center.address = newAddress;
    center.updateCoordinates(newLatitude, newLongitude);

    expect(center.name).toBe(newName);
    expect(center.address).toBe(newAddress);
    expect(center.getLatitude()).toBe(newLatitude);
    expect(center.getLongitude()).toBe(newLongitude);
  });

  it('deve criar um centro inválido se a latitude for atualizada sem longitude', () => {
    const center = new Center({
      name: faker.company.name(),
      address: faker.location.streetAddress(),
    });
    const newLatitude = faker.location.latitude({ min: -90, max: 90 });

    center.updateCoordinates(newLatitude, undefined);

    expect(center.validation.hasError).toBe(true);
  });
  it('deve criar um centro inválido se a longitude for atualizada sem latitude', () => {
    const center = new Center({
      name: faker.company.name(),
      address: faker.location.streetAddress(),
    });
    const newLongitude = faker.location.longitude({ min: -180, max: 180 });

    center.updateCoordinates(undefined, newLongitude);

    expect(center.validation.hasError).toBe(true);
  });
});
