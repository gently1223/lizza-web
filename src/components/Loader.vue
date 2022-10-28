<template>
  <div class="container">
    <div class="center-cropped" style="background-image: url('images/loading.gif');">
      <img src="images/loading.gif" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  template{
    background-color: white;
  }
  .container{
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    min-height: 100vh;
    background: white;
  }
  .center-cropped {
    width: 250px;
    height: 250px;
    background-position: center center;
    background-repeat: no-repeat;
    overflow: hidden;
  }

  /* Set the image to fill its parent and make transparent */
  .center-cropped img {
    min-height: 100%;
    min-width: 100%;
    /* IE 8 */
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
    /* IE 5-7 */
    filter: alpha(opacity=0);
    /* modern browsers */
    opacity: 0;
  }
</style>
