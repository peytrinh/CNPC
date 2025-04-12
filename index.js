// index.js
const express = require('express');
const axios = require('axios');
const app = express();

app.get('/group-members/:groupId', async (req, res) => {
  const groupId = req.params.groupId;
  try {
    const response = await axios.get(`https://groups.roblox.com/v1/groups/${groupId}/users?limit=50`);
    const users = response.data.data.map(user => ({
      username: user.user.username,
      userId: user.user.userId
    }));
    res.json(users);
  } catch (error) {
    res.status(500).send("Failed to fetch group members");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
