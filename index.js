const main = document.querySelector("main");
const input = document.querySelector("input");
const textarea = document.querySelector("textarea");
const button = document.querySelector("button");

const createArticles = async() => {

  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    const items = await res.json();
    items.forEach(function (item) {
      const article = createArticle(item);
      main.appendChild(article);
    });
  } catch (error) {
    main.textContent = "読み込みに失敗しました";
  }
};

function createArticle(item) {
  // console.log(item);
  const article = document.createElement("article");
  // タイトルを作ります
  const title = document.createElement("h2");
  title.textContent = item.title;

  // 本文を作ります
  const body = document.createElement("p");
  body.textContent = item.body;
 
  // articleの中にタイトルと本文を差し込みます
  article.appendChild(title);
  article.appendChild(body);
  //  console.log(article);

　return article;

  // mainの中に追加する
  // main.appendChild(article);
}

window.addEventListener("load", createArticles);

button.addEventListener("click", async function () {
  // console.log(input.value);
  // console.log(textarea.value);

  try {
    
    const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify({
      title: input.value,
      body: textarea.value,
      userId: 1,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  const data = await res.json();
  const article = createArticle(data);
  main.prepend(article);

  } catch (error) {
    alert("投稿に失敗しました")
  }
});
