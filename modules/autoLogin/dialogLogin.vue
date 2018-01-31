<template>
    <el-dialog :visible.sync="dialogVisible" :style = "{'z-index': 100000}">
        <el-form label-width = "80px"  label-position="left" ref="form" :model="form" :rules="rules"> 
            <el-form-item label="用户名" align = "left" prop="username">
                <el-input v-model="form.username"/>
            </el-form-item>
            <el-form-item label="密码" align = "left" prop="password">
                <el-input type="password" v-model="form.password" />
            </el-form-item>
            <el-form-item>
                <el-button @click="handlerLogin"> 登陆 </el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
<script>
import md5 from 'md5'
export default {
    props: {
        ishow: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            dialogVisible: false,
            form: {
                username: '',
                password: ''
            },
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        handlerLogin () {
            const self = this
            self.$refs.form.validate((valid) => {
                const store = nenv.raw.store
                const { form } = self
                if (valid) {
                    store.dispatch('login', {
                        loginName: form.username,
                        pwd: '14e1b600b1fd579f47433b88e8d85291'//md5(md5(form.password))
                    }).then(() => {
                        self.dialogVisible = false
                    })
                } else {
                    return false
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>

