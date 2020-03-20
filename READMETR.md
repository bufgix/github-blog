<h1 align="center">Welcome to github-blog 👋</h1>
<p>
  <a href="https://www.npmjs.com/package/github-blog" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/github-blog.svg">
  </a>
  <a href="https://github.com/bufgix/github-blog/blob/master/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
  <a href="https://twitter.com/bufgix" target="_blank">
    <img alt="Twitter: bufgix" src="https://img.shields.io/twitter/follow/bufgix.svg?style=social" />
  </a>
</p>

> A blog system that using Github Issues

### 🏠 [Homepage](https://github-blog.now.sh/)

![banner](https://i.hizliresim.com/O5vCIe.png)

Bildiğiniz blog sistemi fakat backendinin tamamı Github altyapısına bağlı. Tüm blog yazıları istediğiniz bir reponun issue'lerine bağlı.

## Yükleme

Repoyu dosya sistemimize indirin

```sh
$ git clone https://github.com/bufgix/github-blog && cd github-blog
```

Gerekli bağımlıkları yükleyin

```sh
$ yarn
# veya
$ npm install
```

ardından `config.js` dosyasına gelip bilgilerinizi yazın

```javascript
export default {
  // Github kullanıcı adınız
  username: "bufgix",
  // Profilinize bağlı ve bloglarınızı yazacağınız repo ismi
  repoName: "bufgix.github.io",
  // İsterseniz github profilinizi baz alarak otomatik olarak CV ekleyebilirsiniz. Anasayfada gözükecektir
  useGithubCv: true
};
```

Github-blog, verileri çekmek için graphql kullanan [Github API V4](https://developer.github.com/v4/)'ü kullanıyor. Bu yüzden [Github access token](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line)'e ihtiyaç var. Bir token oluşturup;

- read:user
- user:email
- user:follow

izinlerini vemelisiniz.

Token'i kopyalayın ve `.env` isminde bir dosya içine aşağıdaki gibi yapıştırın

```env
GITHUB_TOKEN=0f49a4540d7efc7272533bc5ba23243da8de8ecd
```

Ardından blogunuzu localde çalıştırmak için

```sh
yarn dev
# veya
npm run dev
```

## Uygulamayı yayınlama

Blogunuz istediğiniz bir VPS'de yayınlayabilceğiniz gibi, Ben hem kolay hem de ücretsiz olan [zeit.co](https://zeit.co/)'yu kullanıyoum. Blogunuzu zeit'e yüklemek için [Now CLI](https://zeit.co/download)'yi indirin. Ardından github tokeni, `Now CLI`'a ekleyin

```sh
$ now secrets add GITHUB_TOKEN <GITHUB_TOKENINIZ>
```

Uygulamanızı şu komutla yayına alın

```sh
$ now deploy
```

Proje isminizi kendinize göre ayarladıktan sonra [zeit.co](https://zeit.co) dan uygulamayı takip edebilirsiniz.

## Yazı Yayınlama

`config.json` da belirtiğiniz reponun `issues` bölümüne bir issue açın. Ardından `blog` isminde bir label yaratıp yazınıza ekleyin. Unutmayın `blog` tagı taşımayan issueler gösterilmiyecektir. Ayrıca başka başka tag'ler oluşturup yazınızın neyler ilgili oldugunu gösterebilirsiniz.

---

Projeyi [bu](https://github.com/saadpasta/react-blog-github) repodan esinlendim. Temelde aynı şeyi yapıyor olsa da Projeyi [Next.js](https://nextjs.org/) ile yazarak SEO friendly olmasını sağladım.


## Author

👤 **bufgix**

- Website: http://www.bufgix.space
- Twitter: [@bufgix](https://twitter.com/bufgix)
- Github: [@bufgix](https://github.com/bufgix)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/bufgix/github-blog/issues).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2020 [bufgix](https://github.com/bufgix).<br />
This project is [MIT](https://github.com/bufgix/github-blog/blob/master/LICENSE) licensed.

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
