import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/kfjk'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/dashboard',
                    component: resolve => require(['../components/page/Dashboard.vue'], resolve),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/icon',
                    component: resolve => require(['../components/page/Icon.vue'], resolve),
                    meta: { title: '自定义图标' }
                },
                {
                    path: '/table',
                    component: resolve => require(['../components/page/BaseTable.vue'], resolve),
                    meta: { title: '基础表格' }
                },
                {
                    path: '/tabs',
                    component: resolve => require(['../components/page/Tabs.vue'], resolve),
                    meta: { title: 'tab选项卡' }
                },
                {
                    path: '/form',
                    component: resolve => require(['../components/page/BaseForm.vue'], resolve),
                    meta: { title: '基本表单' }
                },
                {
                    // 富文本编辑器组件
                    path: '/editor',
                    component: resolve => require(['../components/page/VueEditor.vue'], resolve),
                    meta: { title: '富文本编辑器' }
                },
                {
                    // markdown组件
                    path: '/markdown',
                    component: resolve => require(['../components/page/Markdown.vue'], resolve),
                    meta: { title: 'markdown编辑器' }
                },
                {
                    // 图片上传组件
                    path: '/upload',
                    component: resolve => require(['../components/page/Upload.vue'], resolve),
                    meta: { title: '文件上传' }
                },
                {
                    // vue-schart组件
                    path: '/charts',
                    component: resolve => require(['../components/page/BaseCharts.vue'], resolve),
                    meta: { title: 'schart图表' }
                },
                {
                    // 拖拽列表组件
                    path: '/drag',
                    component: resolve => require(['../components/page/DragList.vue'], resolve),
                    meta: { title: '拖拽列表' }
                },
                {
                    // 拖拽Dialog组件
                    path: '/dialog',
                    component: resolve => require(['../components/page/DragDialog.vue'], resolve),
                    meta: { title: '拖拽弹框' }
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: resolve => require(['../components/page/Permission.vue'], resolve),
                    meta: { title: '权限测试', permission: true }
                },
                {
                    // 故障监控页面
                    path: '/gzjk',
                    component: resolve => require(['../components/page/gzjk.vue'], resolve),
                    meta: { title: '故障监控', gzjk: true }
                },
                {
                    // 故障信息页面
                    path: '/gzxx',
                    component: resolve => require(['../components/page/gzxx.vue'], resolve),
                    meta: { title: '故障信息', gzxx: true }
                },
                {
                    // 客房监控页面
                    path: '/kfjk',
                    component: resolve => require(['../components/page/kfjk.vue'], resolve),
                    meta: { title: '客房监控', kfjk: true }
                },
                {
                    // 客房事件页面
                    path: '/kfsj',
                    component: resolve => require(['../components/page/kfsj.vue'], resolve),
                    meta: { title: '客房事件', kfsj: true }
                },
                {
                    // 设备模式页面
                    path: '/sbms',
                    component: resolve => require(['../components/page/sbms.vue'], resolve),
                    meta: { title: '设备模式', sbms: true }
                },
                {
                    // 用户管理页面
                    path: '/yhgl',
                    component: resolve => require(['../components/page/yhgl.vue'], resolve),
                    meta: { title: '用户管理', yhgl: true }
                },
                {
                    // 角色管理页面
                    path: '/jsgl',
                    component: resolve => require(['../components/page/jsgl.vue'], resolve),
                    meta: { title: '角色管理', jsgl: true }
                },
                {
                    // 酒店管理的集团页面
                    path: '/jt',
                    component: resolve => require(['../components/page/jt.vue'], resolve),
                    meta: { title: '集团', jt: true }
                },
                {
                    // 酒店管理的品牌页面
                    path: '/pp',
                    component: resolve => require(['../components/page/pp.vue'], resolve),
                    meta: { title: '品牌', pp: true }
                },
                {
                    // 酒店管理的门店页面
                    path: '/md',
                    component: resolve => require(['../components/page/md.vue'], resolve),
                    meta: { title: '门店', md: true }
                },
                {
                    // 酒店管理的建筑页面
                    path: '/jz',
                    component: resolve => require(['../components/page/jz.vue'], resolve),
                    meta: { title: '建筑', jz: true }
                },
                {
                    // 酒店管理的楼层页面
                    path: '/lc',
                    component: resolve => require(['../components/page/lc.vue'], resolve),
                    meta: { title: '楼层', lc: true }
                },
                {
                    // 酒店管理的客房页面
                    path: '/kf',
                    component: resolve => require(['../components/page/kf.vue'], resolve),
                    meta: { title: '客房', kf: true }
                },
                {
                    // 酒店管理的房间类型页面
                    path: '/fjlx',
                    component: resolve => require(['../components/page/fjlx.vue'], resolve),
                    meta: { title: '房间类型', fjlx: true }
                },
                {
                    // 设备管理页面
                    path: '/sbgl',
                    component: resolve => require(['../components/page/sbgl.vue'], resolve),
                    meta: { title: '设备管理', sbgl: true }
                },
                {
                    // 应用配置页面
                    path: '/yypz',
                    component: resolve => require(['../components/page/yypz.vue'], resolve),
                    meta: { title: '权限管理', yypz: true }
                },
                {
                    // 操作日志页面
                    path: '/czrz',
                    component: resolve => require(['../components/page/czrz.vue'], resolve),
                    meta: { title: '操作日志', czrz: true }
                },
                {
                    // 字典管理页面
                    path: '/zdgl',
                    component: resolve => require(['../components/page/zdgl.vue'], resolve),
                    meta: { title: '字典管理', zdgl: true }
                },
                {
                    path: '/404',
                    component: resolve => require(['../components/page/404.vue'], resolve),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: resolve => require(['../components/page/403.vue'], resolve),
                    meta: { title: '403' }
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
