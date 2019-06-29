module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'status',
      [
        {
          id: 100,
          name: 'active',
          description: 'indicates that is active',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 200,
          name: 'pending',
          description: 'indicates that is pending',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 300,
          name: 'inactive',
          description: 'indicates that is inactive',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {},
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('status', null, {});
  },
};
