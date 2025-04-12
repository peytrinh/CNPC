const express = require("express");
const axios = require("axios");
const app = express();
const PORT = process.env.PORT || 3000;

// Allow requests from your Roblox game (CORS)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/group-members/:groupId", async (req, res) => {
  const groupId = req.params.groupId;
  let members = [];

  try {
    let nextPageCursor = null;
    let done = false;

    while (!done) {
      const url = `https://groups.roblox.com/v1/groups/3745971/users?limit=100&sortOrder=Asc${nextPageCursor ? `&cursor=${nextPageCursor}` : ""}`;
      const response = await axios.get(url);
      const data = response.data;

      members = members.concat(data.data);

      nextPageCursor = data.nextPageCursor;
      if (!nextPageCursor) {
        done = true;
      }
    }

    res.json(members);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Failed to fetch group members.");
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
