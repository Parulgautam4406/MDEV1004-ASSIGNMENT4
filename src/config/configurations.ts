interface Configuration {
    mongoURI: string;
    port: string;
  }
  
  const config: Configuration = {
    mongoURI: process.env.MONGODB_URI || 'mongodb+srv://parulgautam4406:cN0AcWQk9MmWXn19@moviecluster.fjrkxch.mongodb.net/',
    port: process.env.PORT || '3000'
  };
  
  export default config;
