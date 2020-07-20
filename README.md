
## Installation

First of all, make sure you have all these  prerequisites installed:
- [Node.js](https://nodejs.org/en/) (>=8.9)
- [npm](https://www.npmjs.com/get-npm) version 3+ (or [yarn](https://yarnpkg.com/lang/en/docs/install/#mac-stable) version 1.16+)
- [Docker](https://docker.com)
- [CORS Browser Extension](https://chrome.google.com/webstore/detail/cross-domain-cors/mjhpgnbimicffchbodmgfnemoghjakai)




After checking the prerequisites, follow these simple steps to install and use Fluentbit Dashboard:

```
docker run -ti -p 127.0.0.1:2020:2020 fluent/fluent-bit:1.5 /fluent-bit/bin/fluent-bit -H -i random -i cpu -F stdout -m '*' -o stdout -m '*' -f 1
```

```
$ npm install

# serve with hot reload at localhost:8080 by default.
$ npm run serve

# build for production
$ npm run build

# build for production and view the bundle analyzer report.
$ npm run build --report
```

If you use yarn:
```
$ yarn install

# serve with hot reload at localhost:8080 by default.
$ yarn serve

# build for production
$ yarn build

# build for production and view the bundle analyzer report.
$ yarn build --report
```

```
You can also use [Docker Image](https://hub.docker.com/r/championshuttler/fluentbit-dashboard) to start the frontend dashboard.
```

## Contributing
Thanks for all your wonderful PRs, issues and ideas. You’re always welcome to [join](https://github.com/championshuttler/fluentbit-dashboard/blob/master/.github/CONTRIBUTING.md)!

## License
[MIT](https://github.com/epicmaxco/vuestic-admin/blob/master/LICENSE) license.
