<template>
    <div class="swipe">
        <img :src="src" />
    </div>
</template>

<script>
export default {
    props: {
        src: { default: "" }
    }
};
</script>

<style lang="scss" scoped>
.swipe {
    padding-bottom: 10px;
    display: flex;
    justify-content: center;
    background: #fff;

    img {
        width: 95%;
        height: 95%;
    }
}
</style>