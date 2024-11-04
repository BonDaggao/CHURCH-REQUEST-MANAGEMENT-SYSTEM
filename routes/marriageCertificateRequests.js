// Fetch Marriage Certificate Requests Endpoint
app.get('/api/marriage-certificate-requests', (req, res) => {
  // Fetch Marriage Certificate Requests data from the database
  const sql = 'SELECT * FROM marriage_certificate_requests';
  db.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Error fetching Marriage Certificate Requests' });
    } else {
      res.status(200).json(result);
    }
  });
});
