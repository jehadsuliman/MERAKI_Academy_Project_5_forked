const pg =require("pg");
 const pool =new pg.Pool({
    connectionString: process.env.DB_URL
 })
 pool
 .connect()
 .then(() => {
   console.log("Db Connected");
 })
 .catch((err) => {
   console.log("Db Connection Err", err);
 });

module.exports = {
 pool,
};
