<template>
    <div id="tab-bar">
     <slot></slot>
    </div>
</template>

<script>
export default {
  name: 'TabBer',
  components: {
  }
}
</script>

<style>
#tab-bar{
  display: flex;
  background-color: cornflowerblue;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 49px;
} 

</style>
