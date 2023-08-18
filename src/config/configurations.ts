interface Configuration {
    mongoURI: string;
    port: string;
  }
  
  const config: Configuration = {
    mongoURI: process.env.MONGODB_URI || 'mongodb+srv://suraj_v:zoCy3qRgV46tkFgB@cluster0.botqmpn.mongodb.net/',
    port: process.env.PORT || '3000'
  };
  
  export default config;