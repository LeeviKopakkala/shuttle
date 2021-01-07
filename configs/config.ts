export default { JWT_SECRET: process.env.JWT_SECRET };

if (!process.env.JWT_SECRET) {
  console.log('JWT_SECRET not set.');
  process.exit(1);
}
