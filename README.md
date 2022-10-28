# lizza (lizza-webapp)

POC instagram auth

## Site URL

https://lizza.app/

## Install the dependencies

```bash
npm install
```

## Login into firebase

```bash
firebase login
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
npm run dev
```

### Lint the files

```bash
npm run lint
```

### Build the app for production

```bash
npm run build
```

### Deploy only the web(NEED TO BUILD FOR PRODUCTION FIRST) (one of them)

```bash
npm run deploy:preview
npm run deploy:preview_tony
npm run deploy:preview_jesus
npm run deploy:preview_sara
npm run deploy:preview_mike
npm run deploy:preview_thulsi
```

Preview URL for test - https://lizza-s-pocs--preview-one-7qv2pudz.web.app/ <br>
Preview URL for tony - https://lizza-s-pocs--preview-tony-7l6eknwd.web.app/ <br>
Preview URL for jesus - https://lizza-s-pocs--preview-jesus-l1yizlzh.web.app/ <br>
Preview URL for sara - https://lizza-s-pocs--preview-sara-f8p5f7nt.web.app/ <br>
Preview URL for mike - https://lizza-s-pocs--preview-mike-d44cl5lp.web.app/ <br>
Preview URL for Thulsi - https://lizza-s-pocs--preview-thulsi-4az0hug1.web.app/

### Set firebase config variables for functions

```bash
firebase functions:config:set instagram.client_id="yourClientID" instagram.client_secret="yourClientSecret"
```

### Customize the configuration

See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).

### Basic knowledge

Vue 3 - https://vuejs.org/guide/introduction.html
Composition API - https://vuejs.org/api/composition-api-setup.html