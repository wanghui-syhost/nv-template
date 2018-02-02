<template>
	<div class="standard-ledger">
		<header class="ledger-header" v-if="SHOW_HEAD">
			{{TITLE}}
		</header>
		<div></div>
		<nv-dynamic-ledger :nv-code="nvCode" :nv-embed="true" @slider="slider"></nv-dynamic-ledger>
	</div>
</template>
<script>
	export default {
		name: 'StardardLedger',
		data() {
			const self = this
			return {
				SHOW_HEAD: true,
				TITLE: ''
				
			}
		},
		created() {

		},
		computed: {
			nvCode() {
				return this.$route.query['nv-code']
			}
		},
		methods: {
			slider(sliderMenus) {
				this.SHOW_HEAD = sliderMenus.SHOW_HEAD;
				this.TITLE = sliderMenus.TITLE;
			}
		}
	}
</script>
<style lang="scss" scoped>
	.standard-ledger {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		
		.ledger-header {
			height: 62px;
			line-height: 62px;
			padding-left: 20px;
			font-size: 18px;
			color: #FFFFFF;
			background: rgba(48, 150, 250, 1);
		}
	}
	
</style>