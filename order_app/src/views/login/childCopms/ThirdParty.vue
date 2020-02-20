<template>
        <router-link to="#" >
            <van-image    
                round
                width="40"
                height="40"
                :src="src"
            />
        </router-link>
</template>

<script>
export default {
    props:{
        src:{default:''}
    },
}
</script>

<style scoped>
    .van-image--round{
        border:1px solid rgba(248,129,131,.2);
        margin:0 10px;
    }
</style>