<template>
	<div class="standard-ledger" :class="{'has-header': SHOW_HEAD}">
		<header class="ledger-header" v-if="SHOW_HEAD">
			{{TITLE}}
		</header>
		<section class="ledger-body">
			<section class="ledger-slider">
				<el-menu mode="vertical" :default-active="defaultMenu" :default-openeds="defaultOpend">
					<template v-for="item in routes">
						<el-submenu :index="item.ID" v-if="item.children" :collapse="true" :key="item.ID">
							<template slot="title">
								<i class="el-icon-menu" v-if="item.icon" :class="item.icon"></i> {{item.NAME}}
							</template>
							<template v-for="child in item.children">
								<el-menu-item :index="child.ID" @click="menuClick(child)" :key="child.ID">{{child.NAME}}</el-menu-item>
							</template>
						</el-submenu>
						<el-menu-item v-else :index="item.ID" :collapse="true"  :key="item.ID" @click="menuClick(item)">
							<i class="el-icon-menu" v-if="item.icon" :class="item.icon"></i> {{item.NAME}}
						</el-menu-item>
					</template>
				</el-menu>
			</section>
			<nv-dynamic-ledger ref="dynamicLedger" class="ledger-main" :nv-code="nvCode" :nv-embed="true" @nv-slider="slider"></nv-dynamic-ledger>
		</section>
	</div>
</template>
<script>
	export default {
		name: 'StardardLedger',
		meta: { nvPermission: false},
		data() {
			const self = this
			return {
				collapse: true,
				defaultMenu: '',
				defaultOpend: [],
				SHOW_HEAD: true,
				TITLE: '',
				routes: []
			}
		},
		created() {

		},
		computed: {
			nvCode() {
				return this.$route.query['nv-code'] || this.$route.params.code
			}
		},
		methods: {
			slider(sliderMenus) {
				this.SHOW_HEAD = sliderMenus.ledger.SHOW_HEAD;
				this.TITLE = sliderMenus.ledger.TITLE;
				this.routes = sliderMenus.menus;
				this.defaultMenu = sliderMenus.menus[0].children ? sliderMenus.menus[0].children[0].ID : sliderMenus.menus[0].ID
				this.defaultOpend = [sliderMenus.menus[0].ID]
			},
			menuClick(item) {
				this.$refs.dynamicLedger.handleTabClick(item);
			},
			
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
		// background: rgba(48, 150, 250, 1);
	}

	.ledger-body {
		display: flex;
		width: 100%;
		height: 100%;
		overflow: auto;
		.ledger-slider {
			position: fixed;
			width: 180px;
			height: 100%;
			top: 0;
			bottom: 0;
			overflow: auto;
			margin-right: 20px;
			background-color: #FFFFFF;
			box-shadow: 0 0 4px #BFC4B6;
		}
		.nv-ledger {
			flex: 1;
			border: 1px solid #CCCCCC;
			background-color: #FFFFFF;
			box-shadow: 0 0 4px #AFC5DE;
		}
	}

	&.has-header {
		.ledger-slider {
			top: 62px;
		}
		.ledger-body {
			height: calc(100% - 62px);
		}
	}
	
}

.ledger-main {
	margin-left: 200px;
	margin-top: 16px;
}

</style>