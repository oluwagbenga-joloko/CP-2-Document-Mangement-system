// Allowing console calls below since this is a build file.
/* eslint-disable no-console */
import webpack from 'webpack';
import log from 'npmlog';
import webpackConfig from '../webpack.config.prod';
 // this assures the Babel dev config (for hot reloading) doesn't apply.
process.env.NODE_ENV = 'production';


console.log(`Generating minified bundle for production v
ia Webpack. This will take a moment...`.blue);

webpack(webpackConfig).run((err, stats) => {
  if (err) { // so a fatal error occurred. Stop here.
    log.error('error', err);
    return 1;
  }
  const jsonStats = stats.toJson();

  if (jsonStats.hasErrors) {
    return jsonStats.errors.map(error => log.error('error', error));
  }

  if (jsonStats.hasWarnings) {
    log.info('Webpack generated the following warnings');
    jsonStats.warnings.map(warning => log.error('error', warning));
  }
  log.info(`Webpack stats: ${stats}`);
  // if we got this far, the build succeeded.
  log.info(`Your app has been compiled in productio
  n mode and written to /dist. It's ready to roll!`);
  return 0;
});
