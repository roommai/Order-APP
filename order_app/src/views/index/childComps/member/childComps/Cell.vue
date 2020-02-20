<template>
    <div class="cell">
        <van-cell title="会员须知" is-link url="/vant/mobile.html" />
        <van-cell title="常见问题" is-link to="index" />
    </div>
</template>

<script>
export default {};
</script>
<style lang="scss" scoped>
.cell {
    margin: 8px 0;
    .van-cell {
        &:nth-child(1) {
            border-bottom: 1px solid #ccc;
        }
    }
}
</style>