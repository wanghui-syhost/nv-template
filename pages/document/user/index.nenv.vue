<template>
    <nv-layout>
    	<div class="user">
    		<el-row :gutter="20">
			  	<el-col :span="6">
			  		<div class="user-left">
			  			<el-tree class="user-left-tree" node-key="id" :data="leftData" :props="defaultProps" :default-expanded-keys="defaultExpanded" @node-click="handleNodeClick"></el-tree>
			  		</div>
			  	</el-col>
			  	<el-col :span="18">
			  		<div class="user-right"></div>
			  	</el-col>
			</el-row>
    	</div>
        
    </nv-layout>
</template>
<script>
const  TOKEN = localStorage.getItem('user.token')
export default {
    name: 'user',
    data() {
    	return {
    		defaultExpanded: [],
    		defaultProps: {
	          	children: 'children',
	          	label: 'text'
	        },
    		leftData: [],
    	}
    },
    created() {
    	this.getOrganizes();
    },
    methods: {
    	getOrganizes(){
	        let $this = this;
	        unfetch.get('/user/organize', {
		        headers: {
		          'Authorization': TOKEN
		        },
		    }).then(function ({data}) {
		    	$this.defaultExpanded.push(data[0].id);
		        $this.leftData = data
		    });
      	},
    	handleNodeClick() {
    		
    	}
    }
}
</script>

<style lang="scss" scoped>
	.user {
		border: 1px solid #c2c2c2;
		&-left {
			border-right: 1px solid #c2c2c2;
			height: 730px;
			overflow: auto;
		}
		&-right {
			border-left: 1px solid #c2c2c2;
			height: 730px;
		}
	}
</style>