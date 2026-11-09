import { faker } from '@faker-js/faker';

export function createBookingPayload() {
  const checkin = faker.date.soon({ days: 30 });
  const checkout = new Date(checkin);
  checkout.setDate(checkout.getDate() + 3);

  return {
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
    totalprice: faker.number.int({ min: 50, max: 1000 }),
    depositpaid: faker.datatype.boolean(),
    bookingdates: {
      checkin: checkin.toISOString().slice(0, 10),
      checkout: checkout.toISOString().slice(0, 10),
    },
    additionalneeds: faker.helpers.arrayElement([
      'Breakfast',
      'Late checkout',
      'Airport transfer',
    ]),
  };
}
