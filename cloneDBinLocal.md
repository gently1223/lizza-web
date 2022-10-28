# Instrucciones clonar la información de Firebase en Local:
### Requirements:
  * Install the Google Cloud CLI (<a href="https://cloud.google.com/sdk/docs/install-sdk">aquí</a>).
  * En terminal ejecutar:
  1. En la carpeta `/` ejecutar: `firebase login` Para logearse con la cuenta de Lizza.
  2. En la carpeta `/` ejecutar: `gcloud auth login` Para logearse con la cuenta de Lizza.
  3. En la carpeta `/` ejecutar: `firebase projects:list` Para ver los proyectos.
  4. En la carpeta `/` ejecutar: `firebase use your-project-name` CAMBIAR your-project-name por el de lizza que salga en la lista del paso 3.
  5. En la carpeta `/` ejecutar: `gcloud projects list` Para listar los proyectos de gcloud.
  6. En la carpeta `/` ejecutar: `gcloud config set project lizza-s-pocs`
  7. En la carpeta `/` ejecutar: `gcloud firestore export gs://your-project-name.appspot.com/your-choosen-folder-name` (En mi caso escribi el siguiente: `gcloud firestore export gs://lizza-s-pocs.appspot.com/tonyvazgar`) Esto va a crear una carpeta dentro de functions (recomiendo agregarla al `.gitignore`)
  8. En la carpeta `/` ejecutar: `cd funtions`
  9. En la carpeta `/funtions` ejecutar: `gsutil -m cp -r gs://your-project-name.appspot.com/your-choosen-folder-name .` (En mi caso escribi el siguiente: `gsutil -m cp -r gs://lizza-s-pocs.appspot.com/tonyvazgar .`)
  10. En la carpeta `/funtions` ejecutar: `firebase emulators:start --import ./your-choosen-folder-name`(En mi caso escribi el siguiente: `firebase emulators:start --import ./tonyvazgar `)
  11. DONE ya se puede ver el emulador con los datos hasta el momento del respaldo.
