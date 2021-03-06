module.exports = (baseDir, client) => {
  client.loadCommand = (commandName) => {
    try {
      client.logger.log(`Loading Command: ${commandName}`);
      const props = require(`../../${baseDir}/commands/${commandName}`);
      if(props.init) props.init(client);
      client.commands.set(props.help.name, props);
      props.conf.aliases.forEach(alias => {
        client.aliases.set(alias, props.help.name);
      });
      return false;
    } catch(e) {
      return `Unable to load command ${commandName}: ${e.stack}`;
    }
  };

  process.on("unhandledRejection", err => {
    client.logger.error(`Unhandled rejection: ${err.stack}`);
  });
};
