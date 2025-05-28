import express from 'express';

const articleInfo = [
  { name: 'learn-node', upvotes: 0, comments: [] },
  { name: 'learn-react', upvotes: 0, comments: [] },
  { name: 'mongodb', upvotes: 0, comments: [] },
];

const app = express();

app.use(express.json());

app.post('/api/articles/:name/upvote', function (req, res) {
  const article = articleInfo.find(
    (article) => article.name === req.params.name
  );
  article.upvotes += 1;
  res.send(
    'Hooray, success! The article ' +
      req.params.name +
      ' now has ' +
      article.upvotes +
      ' upvotes!'
  );
});

app.post('/api/articles/:name/comments', function (req, res) {
  const { name } = req.params;
  const { postedBy, text } = req.body;

  const article = articleInfo.find((article) => article.name === name);
  article.comments.push({
    postedBy,
    text,
  });

  res.json(article);
});

app.listen(8000, function () {
  console.log('Server is listening on port 8000');
});
