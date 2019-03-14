// play this: https://www.youtube.com/watch?v=d-diB65scQU

const server = require("./server.js");

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
