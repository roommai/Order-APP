<template>
	<div>
		<carousels></carousels>
		<menubar></menubar>
		<social-circle></social-circle>
	</div>
</template>
<script>
// import { mapState } from "vuex";
import Carousels from "./bodyComps/Carousels";
import Menubar from "./bodyComps/Menubar";
import SocialCircle from "./bodyComps/SocialCircle";

export default {
	components: {
		Carousels,
		Menubar,
		SocialCircle
	},
	computed: {
		// ...mapState(["bool"])
	},
};
</script>
