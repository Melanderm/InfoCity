function Article() {

  let settings = require('./settings.json');

  this.getArticle = function (query) {
      let url = this.buildUrl(query);
      let header = settings.header;

      return new Promise((resolve, reject) => {
        fetch(url, header).then((response) => {
          let jsonArticle = JSON.parse(response._bodyInit).results[0];
          let articlesArr = [];
          let obj = {};

          if (JSON.parse(response._bodyInit).results.length) {
            obj = {
              header: jsonArticle.label,
              payload: jsonArticle.description,
              status: 'ok',
            };
            articlesArr.push(obj);
          } else {
            obj = {
              header: '',
              payload: '',
              status: 'fail'
            };
            articlesArr.push(obj);
          }

          resolve(articlesArr);
        }).catch((e) => {
          reject(e);
        });
      });
    };

  this.buildUrl = function(query) {
    return settings.url + encodeURIComponent(query);
  };
}

module.exports = Article;
