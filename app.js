// Import necessary modules and create an Express app instance
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to serve static files from the 'public' directory
app.use(express.static('public'));

// Middleware to parse URL-encoded data from form submissions
app.use(express.urlencoded({ extended: false }));

// Set EJS as the templating engine to render views
app.set('view engine', 'ejs');

// Import and configure MariaDB for database connection
const mariadb = require('mariadb');

// Configure the database connection pool, providing database connection details
const pool = mariadb.createPool({
    host: 'localhost', 
    user: 'root', 
    password: '1234', 
    database: 'reservations' 
});

// Function to establish a connection to the MariaDB database
async function connect() {
    try {
        let conn = await pool.getConnection();  // Get a connection from the pool
        console.log('Connected to the database');  // Log success message
        return conn;  // Return the connection object
    } catch (err) {
        console.log('Error connecting to the database: ' + err);  // Log any errors encountered
    }
}

// Route to handle requests to the homepage ('/')
app.get('/', (req, res) => {
    console.log("Hello, world - server!");  
    res.render('home');  
});

// Route to handle requests to the "About Me" page ('/aboutMe')
app.get('/aboutMe', (req, res) => {
    res.render('aboutMe'); 
});

// Route to handle form submissions ('/submit') via POST method
app.post('/submit', async (req, res) => {


    // Create an object with the form data for easier handling
    const data = {
        firstName: req.body.fname,
        lastName: req.body.lname,
        position: req.body.position,
        jersy: req.body.number,
        email: req.body.email,
        message: req.body.message,
        team: req.body.group
    };

    console.log(data);  // Log the data object

    // Connect to the database
    const conn = await connect();

    // Insert the form data into the 'players' table of the database
    await conn.query(`INSERT INTO players (firstName, lastName, position, jersy, team) 
                      VALUES ('${data.firstName}', '${data.lastName}', '${data.position}', 
                      '${data.jersy}', '${data.team}');`);

    // Query the database to retrieve the most recent entry based on the timestamp
    const rows = await conn.query(`
        SELECT * FROM players
        ORDER BY timestamp DESC
    `);

    // Render the confirmation page, passing the most recent data to the view
    res.render('confirmation', { details: data });
});

// Route to display all player submissions ('/list') via GET method
app.get('/list', async (req, res) => {
    const conn = await connect();  // Connect to the database
    const rows = await conn.query('SELECT * FROM players;');  
    res.render('list', { details: rows });  
});

// Route to handle the confirmation page ('/confirmation') using GET method
app.get('/confirmation', (req, res) => {
    
    res.render('confirmation', { details: req.body });
});

// Start the server and listen on the specified port (3000)
app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);  // Log a message when the server starts
});
