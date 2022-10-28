# Instrucciones para hacer deploy:
### Si es primera vez:
  * Dejar todos los archivos como estan en la rama `main`
  * NO hacer `firebase init`, si ya se realizo, descartar todos los cambios en archivos de firebase (firebase.json, firestore.rules, etc.) ya que se sobre-escribieron y no apuntan correctamente.

## Seguir los pasos:
  0. Ejecutar `npm init` en la carpeta `/` y en la de `/functions`
  1. En la carpeta root ejecutar: <br>`npm run build` para "compilar" el proyecto. <br>
  El resultado quedará en la carpeta dist/spa (esta es la que se sube a la preview de firebase)
  2. Para probar los cambios hechos ejecutar: `npm run deploy:preview` <br> Esto subira la carpeta de `dist/spa` a Firebase<br><b>Nota: si se ejecuta sin hacer el paso 1, no se subirá nada y la pagina de preview y se tendrá nada en la preview</b>
  3. Ejecutar `npm run deploy:functions`
  4. Probar en <a href='https://lizza-s-pocs--preview-one-7qv2pudz.web.app'>https://lizza-s-pocs--preview-one-7qv2pudz.web.app</a>

## Notas
* Pedir el archivo `.env` a alguien del equipo
* Tener instalado el JDK de JAVA.
* Para probar los cambios realizados en el <i>back</i> se deben seguir los pasos anteriores.
* Para hacer pruebas de <i>front</i> se debe de ejecutar con los emuladores de firebase con `npm run dev` y en otra terminal ejecutar `npm run emulate`.
* <b>Las previews tienen 7 días de vigencia </b> por lo que hay que actualizar la constante `OAUTH_REDIRECT_URI_TEST` que está en el archivo de `/functions/src/api/index.ts` y en el SDK de Facebook para poder hacer el Login.<br>
Lo que cambia en la vigencia es: <i>lizza-s-pocs--preview-one-<b>7qv2pudz</b>.web.app</i> donde las negritas las actualiza FireBase.
