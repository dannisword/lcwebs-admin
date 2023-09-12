<template>
  <div class="error-container">
    <h1>OPPS</h1>
     <img src="/src/assets/page-not.png" />
  </div>
</template>
<style lang="scss">
.error-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    img {
        max-width: 100%;
        width: 90%;
    }
    h1 {
        font-size: 5rem;
        color: #fdc4c0;
        margin: 0;
    }
}
</style>