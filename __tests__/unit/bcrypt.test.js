const bcrypt = require('../../src/utils/bcryptUtil');
const { User } = require('../../src/app/models');
const factory = require('../factories');

describe('Bcrypt - user', () => {
  it('should encrypt user password', async () => {
    const user = await factory.create('User', {
      password: '123',
    });

    expect(await bcrypt.compare('123', user.passwordHash)).toBe(true);
    await User.destroy({ where: { id: user.id } });
  });
});
