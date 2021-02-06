const app = require('./app');

require('./utils/loadRelationships');

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port ${process.env.PORT}`);
});
