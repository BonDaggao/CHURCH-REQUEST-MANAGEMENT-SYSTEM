// Fetch Baptism Certificate Requests Endpoint
app.get('/api/requests', (req, res) => {
  // Fetch Baptism Certificate Requests data from the database
  const sql = 'SELECT * FROM baptism_certificate_requests';
  db.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Error fetching Baptism Certificate Requests' });
    } else {
      res.status(200).json(result);
    }
  });
});

// Add other endpoints for CRUD operations as needed (e.g., add, update, delete)
