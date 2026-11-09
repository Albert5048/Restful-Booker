export const bookingIdsSchema = {
  type: 'array',
  items: {
    type: 'object',
    required: ['bookingid'],
    properties: {
      bookingid: { type: 'integer', minimum: 1 },
    },
    additionalProperties: false,
  },
};
