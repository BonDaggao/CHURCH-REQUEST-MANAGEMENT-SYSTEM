// Fetch Good Moral Requests Endpoint
app.get('/api/good-moral-requests', (req, res) => {
  // Fetch Good Moral Requests data from the database
  const sql = 'SELECT * FROM good_moral_requests';
  db.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Error fetching Good Moral Requests' });
    } else {
      res.status(200).json(result);
    }
  });
});
