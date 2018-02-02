<template>
	<div class="standard-ledger">
		<header class="ledger-header" v-if="SHOW_HEAD">
			{{TITLE}}
		</header>
		<section class="ledger-body">
			<section class="ledger-slider">
				<el-menu default-active="2" >
			      <el-submenu index="1">
			        <template slot="title">
			          <i class="el-icon-location"></i>
			          <span>导航一</span>
			        </template>
		          	<el-menu-item index="1-1">选项1</el-menu-item>
		          	<el-menu-item index="1-2">选项2</el-menu-item>
			      </el-submenu>
			      <el-menu-item index="2">
			        <i class="el-icon-menu"></i>
			        <span slot="title">导航二</span>
			      </el-menu-item>
			      <el-menu-item index="3">
			        <i class="el-icon-setting"></i>
			        <span slot="title">导航三</span>
			      </el-menu-item>
			    </el-menu>
			</section>
			<nv-dynamic-ledger :nv-code="nvCode" :nv-embed="true" @slider="slider"></nv-dynamic-ledger>
		</section>
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
			width: 100%;
			height: 62px;
			line-height: 62px;
			text-indent: 20px;
			font-size: 18px;
			color: #FFFFFF;
			background: rgba(48, 150, 250, 1);
		}
		
		.ledger-body {
			display: flex;
			height: calc(100% - 62px);
			width: 100%;
			overflow: hidden;
			.ledger-slider {
				width: 180px;
				height: 100%;
				margin-right: 20px;
				background-color: #FFFFFF;
				box-shadow: 0 0 4px #e2e2e2;
			}
			.nv-ledger {
				flex: 1;
				border: 1px solid #CCCCCC;
			}
		}
		
	}
	
</style>