// Fetch Mass Cards Requests Endpoint
app.get('/api/mass-cards-requests', (req, res) => {
  // Fetch Mass Cards Requests data from the database
  const sql = 'SELECT * FROM mass_cards_requests';
  db.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Error fetching Mass Cards Requests' });
    } else {
      res.status(200).json(result);
    }
  });
});
