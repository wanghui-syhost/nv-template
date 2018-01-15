<template>
	<div class="dialog-select">
		<el-button size="mini" type="primary" @click="handleClick">{{title}}</el-button>
		<el-dialog :title="title" :visible.sync="dialogVisible" width="800px">
			<el-form :model="dialogForm">
				<div class="select-tree">
					<div class="select-tree__left">
						<div class="search-div">
							<el-input class="search" placeholder="输入关键字进行搜索" v-model="filterText"></el-input>
						</div>
						<div class="tree-div">
							<el-tree ref="selectTree" class="filter-tree" :disabled="true" :data="treeData" :props="defaultProps" 
								@check-change="checkChange" node-key="id" default-expand-all
								show-checkbox :filter-node-method="filterNode">
							</el-tree>
						</div>
					</div>
					<div class="select-tree__right">
						<div v-for="node in nodeList" :key="node.id" @mouseenter="nodeEnter($event);" @mouseout="nodeOut($event);">
						    <li>{{ node.text }}</li>
						    <li class="user-dept">{{ node.deptPath }}</li>
						    <i @mouseenter="nodeEnter($event, true);" @click="removeSelected(node);">×</i>
						</div>
					</div>
				</div>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="getCheckedNodes">确 定</el-button>
				<el-button @click="dialogVisible = false">取 消</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	// import { getAjaxData } from "@core/api/";
	export default {
		name: 'NvOrganizeUserSelector',
		props: {
			title: {
				type: String,
				default: '选择'
			},
			// 匹配的label
			label: {
				type: String,
				default: 'label'
			},
			// 请求url地址
			url: {
				type: String,
				required: true
			},
			callback: {
				type: Function
			},
			mutil: {
				type: String
			}
		},
		data() {
			return {
		        defaultProps: {
		          	children: 'children',
		          	label: this.label
		        },
				dialogVisible: false,
				dialogForm: {
					
				},
			    filterText: '',
				treeData: [],
				nodeList: []
			};
		},
		mounted() {
			const self = this;
			unfetch(this.url, {}).then(({ data }) => {
		        self.loopData(data[0].children, '');
		        self.treeData = data;
		    });
		},
		watch: {
	      	filterText(val) {
	        	this.$refs.selectTree.filter(val);
	      	}
	    },
		methods: {
			loopData(data, deptPath) {
				for (const node of data) {
					let tempPath = deptPath;
					if (node.children) {
						//node.disabled = true;
						tempPath += ' / '+ node.text;
						this.loopData(node.children, tempPath);
					} else {
						node.deptPath = deptPath;
					}
				}
			},
			// 点开弹出
			handleClick() {
				this.dialogVisible = true;
			},
			filterNode(value, data) {
		        if (!value) return true;
		        return data[this.label].indexOf(value) !== -1;
		    },
		    getCheckedNodes() {
		        if (this.nodeList.length < 1) {
		        	this.$message.error('需要勾选人员才能确定哦');
		        } else {
		    		this.dialogVisible = false;
		    		if (this.callback) {
		    			this.callback(this.nodeList);
		    		}
		        }
		    },
		    checkChange(node, isChecked, isChildChecked) {
                debugger
		    	if (!node.children) {
		    		if (isChecked) {
		    			if (this.filterText && node.text.indexOf(this.filterText) == -1) {
		    				// 如果是搜索，不在搜索范围的取消
					    	const selectTree = this.$refs.selectTree;
					    	selectTree.setChecked(node.id, false, false);
		    			} else {
		    				if (!this.mutil && this.nodeList.length > 0) {
		    					// 单选
		    					const nodeObj = this.nodeList[0];
		    					// 移除其他勾选的
		    					this.removeSelected(nodeObj);
		    				}
		    				this.nodeList.push({ id: node.id, text: node.text, deptPath: node.deptPath });
		    			}
			    	} else {
			    		// 取消勾选
			    		for(let i = 0; i < this.nodeList.length; i++) {
						    if(this.nodeList[i].id == node.id) {
						      this.nodeList.splice(i, 1);
						      break;
						    }
						}
			    	}
		    	}
		    },
		    nodeEnter(e, flag) {
		    	if (flag) e.target.parentNode.classList.add('active');
		    	else e.target.classList.add('active');
		    },
		    nodeOut(e) {
		    	e.target.classList.remove('active');
		    },
		    removeSelected(node) {
		    	for (let i = 0; i < this.nodeList.length; i++) {
		    		const nodeObj = this.nodeList[i];
		    		if (nodeObj.id == node.id) {
		    			this.nodeList.splice(i, 1);
		    			break;
		    		}
		    	}
		    	const selectTree = this.$refs.selectTree;
		    	selectTree.setChecked(node.id, false, false);
		    }
		}
	}
</script>

<style lang="scss" scoped>
	.dialog-footer {
		text-align: center;
	}
	.select-tree {
		height: 335px;
		border: 1px solid #DEDEDE;
		&__left { 
			display: inline-block; width: 48%; height: 100%; border-right: 1px solid #DEDEDE; position: relative;
			.search-div { padding: 10px; position: absolute; border-bottom: 1px solid #DEDEDE; left: 0; top: 0; right: 0; background-color: #fff; z-index: 2; }
			.tree-div { overflow: auto; height: 271px; margin-top: 62px; }
		}
		&__right { 
			display: inline-block; width: 48%; height: 100%; border-left: 1px solid #DEDEDE; 
			vertical-align: top; float: right; overflow: auto; 
			div {
				position: relative; padding: 6px 10px; border-bottom: 1px solid #DEDEDE;
				li { list-style-type: none; line-height: 21px; color: #333; pointer-events: none; }
				li.user-dept { color: #999; font-size: 12px; line-height: 20px; }
				i { display: none; background-color: #398DEE; padding: 0px 5px 0 4px; color: #fff; border-radius: 10px; 
					position: absolute; right: 5px; top: 18px; height: 18px; line-height: 18px; cursor: pointer; }
			}
			div.active { background-color: #D9EBFE; }
			div.active i { display: block; }
		}
	}
</style>