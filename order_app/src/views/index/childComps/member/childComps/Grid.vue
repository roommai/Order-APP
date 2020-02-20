<template>
	<div class="grid">
		<van-image :src="src" />
	</div>
</template>

<script>
export default {
	props: {
		src: { default: "" }
	}
};
</script>

<style scoped lang="scss">
.gride {
	background: #fff;
}
.van-image {
	width: 25px;
	height: 25px;
	margin-top: -10px;
}
</style>
