import Vue from 'vue'
import Router from 'vue-router'
import Cookies from 'js-cookie'
// import layout from './views/layout-dashboard1.vue'
//import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)
const router = new Router({
  mode: 'history',
  base: '',
  routes: [
    {
      // ==================== 打印例子 ====================
      path: '/print',
      // 'component': require('./views/layout-auth.vue'),
      component: require('./views/print-example/app.vue'),
    },
    {
      // ==================== 登录-初始化 ====================
      path: '/init',
      // 'component': require('./views/layout-auth.vue'),
      component: require('./views/auth/init.vue'),
    },
    {
      path: '/',
      redirect: 'init',
      component: () => import('./views/layout-dashboard.vue'),
      children: [
        {
          // ==================== 上线信息处理页面 ====================
          path: 'online',
          // 'component': require('./views/layout-auth.vue'),
          component: require('./views/online.vue'),
          meta: {
            title: '上线-进销存系统',
          }
        },
        {
          // ==================== 默认页面 ====================
          path: 'home',
          // 'component': require('./views/layout-auth.vue'),
          component: require('./views/home.vue'),
          meta: {
            title: '欢迎页-进销存系统',
          }
        },
        // ==================== 供应商管理===========================
        {
          path: 'supplier-management',
          component: () =>
            import('./views/supplier-management/supplier-management.vue'),
          meta: {
            // crumbList: ['首页', '基础信息管理', '供应商管理'],
            crumbList: [
              {
                href:'javascript:;',
                name:'首页'
              },
              {
                href:'javascript:;',
                name:'基础信息管理'
              },
              {
                href:'javascript:;',
                name:'供应商管理'
              },
            ],
            title: '供应商管理-进销存系统',
          }
        },
        // ==================== 仓库管理===========================
        {
          path: 'warehouse-management',
          component: () =>
            import('./views/warehouse-management/warehouse-management.vue'),
          meta: {
            // crumbList: ['首页', '基础信息管理', '仓库管理'],
            crumbList: [
              {
                href:'javascript:;',
                name:'首页'
              },
              {
                href:'javascript:;',
                name:'基础信息管理'
              },
              {
                href:'javascript:;',
                name:'仓库管理'
              },
            ],
            title: '仓库管理-进销存系统',
          }
        },
        // ==================== 库位管理===========================
        {
          path: 'warehouse-position-management',
          component: () =>
            import('./views/warehouse--position-management/warehouse-position-management.vue'),
          meta: {
            // crumbList: ['首页', '基础信息管理', '库位管理'],
            crumbList: [
              {
                href:'javascript:;',
                name:'首页'
              },
              {
                href:'javascript:;',
                name:'基础信息管理'
              },
              {
                href:'javascript:;',
                name:'库位管理'
              },
            ],
            title: '库位管理-进销存系统',
          }
        },
        // ==================== 商品管理===========================
        {
          path: 'commodity-management',
          component: () =>
            import('./views/commodity-management/layout.vue'),
          children: [
            // ==================== 类别管理===========================
            {
              path: 'category-management',
              component: () =>
                import('./views/commodity-management/category-management/category-management.vue'),
              meta: {
                // crumbList: ['首页', '商品管理', '类别管理'],
                crumbList: [
                  {
                    href:'javascript:;',
                    name:'首页'
                  },
                  {
                    href:'javascript:;',
                    name:'商品管理'
                  },
                  {
                    href:'javascript:;',
                    name:'类别管理'
                  },
                ],
                title: '类别管理-进销存系统',
              }
            },
            // ==================== 配件管理===========================
            {
              path: 'parts-management',
              component: () =>
                import('./views/commodity-management/parts-management/parts-management.vue'),
              meta: {
                // crumbList: ['首页', '商品管理', '配件管理'],
                crumbList: [
                  {
                    href:'javascript:;',
                    name:'首页'
                  },
                  {
                    href:'javascript:;',
                    name:'商品管理'
                  },
                  {
                    href:'javascript:;',
                    name:'配件管理'
                  },
                ],
                title: '配件管理-进销存系统',
              }
            },
            // ==================== 工项管理===========================
            {
              path: 'item-management',
              component: () =>
                import('./views/commodity-management/item-management/item-management.vue'),
              meta: {
                // crumbList: ['首页', '商品管理', '工项管理'],
                crumbList: [
                  {
                    href:'javascript:;',
                    name:'首页'
                  },
                  {
                    href:'javascript:;',
                    name:'商品管理'
                  },
                  {
                    href:'javascript:;',
                    name:'工项管理'
                  },
                ],
                title: '工项管理-进销存系统',
              }
            },
            // ==================== 套餐管理===========================
            {
              path: 'package-management',
              component: () =>
                import('./views/commodity-management/package-management/package-management.vue'),
              meta: {
                // crumbList: ['首页', '商品管理', '套餐管理'],
                crumbList: [
                  {
                    href:'javascript:;',
                    name:'首页'
                  },
                  {
                    href:'javascript:;',
                    name:'商品管理'
                  },
                  {
                    href:'javascript:;',
                    name:'套餐管理'
                  },
                ],
                title: '套餐管理-进销存系统',
              }
            },
            // ==================== 新增套餐===========================
            {
              path: 'package-management/add',
              component: () =>
                import('./views/commodity-management/package-management/add.vue'),
              meta: {
                // crumbList: ['首页', '商品管理', '套餐管理', '新增套餐'],
                crumbList: [
                  {
                    href:'javascript:;',
                    name:'首页'
                  },
                  {
                    href:'javascript:;',
                    name:'商品管理'
                  },
                  {
                    href:'/commodity-management/package-management',
                    name:'套餐管理'
                  },
                  {
                    href:'javascript:;',
                    name:'新增套餐'
                  },
                ],
                title: '套餐管理-进销存系统',
              }
            },
            // ==================== 修改套餐===========================
            {
              path: 'package-management/edit/:id',
              component: () =>
                import('./views/commodity-management/package-management/edit.vue'),
              meta: {
                // crumbList: ['首页', '商品管理', '套餐管理', '修改套餐'],
                crumbList: [
                  {
                    href:'javascript:;',
                    name:'首页'
                  },
                  {
                    href:'javascript:;',
                    name:'商品管理'
                  },
                  {
                    href:'/commodity-management/package-management',
                    name:'套餐管理'
                  },
                  {
                    href:'javascript:;',
                    name:'修改套餐'
                  },
                ],
                title: '套餐管理-进销存系统',
              }
            },
          ]
        },
        // ====================采购管理===========================
        {
          path: 'purchasing-management',
          redirect: 'purchasing-management/procurement-application',
          component: () =>
            import('./views/purchasing-management/layout.vue'),
          children: [
            // ==================== 采购申请==========================
            {
              path: 'procurement-application',
              component: () =>
                import('./views/purchasing-management/procurement-application/layout.vue'),
              children: [
                {
                  path: '/',
                  component: () =>
                    import('./views/purchasing-management/procurement-application/procurement-application.vue'),
                  meta: {
                    // crumbList: ['首页', '采购管理', '采购申请'],
                    crumbList: [
                      {
                        href:'javascript:;',
                        name:'首页'
                      },
                      {
                        href:'javascript:;',
                        name:'采购管理'
                      },
                      {
                        href:'javascript:;',
                        name:'采购申请'
                      },
                    ],
                    title: '采购申请-进销存系统',
                  }
                },
                // ==================== 新增采购申请===========================
                {
                  path: 'add',
                  component: () =>
                    import('./views/purchasing-management/procurement-application/procurement-application-add.vue'),
                  meta: {
                    // crumbList: ['首页', '采购管理', '采购申请', '新增采购申请'],
                    crumbList: [
                      {
                        href:'javascript:;',
                        name:'首页'
                      },
                      {
                        href:'javascript:;',
                        name:'采购管理'
                      },
                      {
                        href:'/purchasing-management/procurement-application/',
                        name:'采购申请'
                      },
                      {
                        href:'javascript:;',
                        name:'新增采购申请'
                      },
                    ],
                    title: '采购申请-进销存系统',
                  }
                },
                // ==================== 采购申请详情===========================
                {
                  path: 'detail/:purchaseApplyId',
                  component: () =>
                    import('./views/purchasing-management/procurement-application/procurement-application-detail.vue'),
                  meta: {
                    // crumbList: ['首页', '采购管理', '采购申请', '采购申请详情'],
                    crumbList: [
                      {
                        href:'javascript:;',
                        name:'首页'
                      },
                      {
                        href:'javascript:;',
                        name:'采购管理'
                      },
                      {
                        href:'/purchasing-management/procurement-application/',
                        name:'采购申请'
                      },
                      {
                        href:'javascript:;',
                        name:'采购申请详情'
                      },
                    ],
                    title: '采购申请-进销存系统',
                  }
                },
              ],
            },
            // ==================== 采购订单==========================
            {
              path: 'procurement-order',
              component: () =>
                import('./views/purchasing-management/procurement-order/layout.vue'),
              children: [
                {
                  path: '/',
                  component: () =>
                    import('./views/purchasing-management/procurement-order/procurement-order.vue'),
                  meta: {
                    // crumbList: ['首页', '采购管理', '采购单'],
                    crumbList: [
                      {
                        href:'javascript:;',
                        name:'首页'
                      },
                      {
                        href:'javascript:;',
                        name:'采购管理'
                      },
                      {
                        href:'javascript:;',
                        name:'采购单'
                      },
                    ],
                    title: '采购单-进销存系统',
                  }
                },
                // ==================== 新增采购订单===========================
                {
                  path: 'add',
                  component: () =>
                    import('./views/purchasing-management/procurement-order/procurement-order-add2.vue'),
                  meta: {
                    // crumbList: ['首页', '采购管理', '采购单', '新增采购单'],
                    crumbList: [
                      {
                        href:'javascript:;',
                        name:'首页'
                      },
                      {
                        href:'javascript:;',
                        name:'采购管理'
                      },
                      {
                        href:'/purchasing-management/procurement-order/',
                        name:'采购单'
                      },
                      {
                        href:'javascript:;',
                        name:'新增采购单'
                      },
                    ],
                    title: '采购单-进销存系统',
                  }
                },
                // ==================== 查看采购订单===========================
                {
                  path: 'detail/:purchaseOrderId',
                  component: () =>
                    import('./views/purchasing-management/procurement-order/procurement-order-detail.vue'),
                  meta: {
                    // crumbList: ['首页', '采购管理', '采购单', '查看采购单'],
                    crumbList: [
                      {
                        href:'javascript:;',
                        name:'首页'
                      },
                      {
                        href:'javascript:;',
                        name:'采购管理'
                      },
                      {
                        href:'/purchasing-management/procurement-order/',
                        name:'采购单'
                      },
                      {
                        href:'javascript:;',
                        name:'查看采购单'
                      },
                    ],
                    title: '采购单-进销存系统',
                  }
                },
              ],
            },
            // ==================== 采购退货==========================
            {
              path: 'procurement-return',
              component: () =>
                import('./views/purchasing-management/procurement-return/layout.vue'),
              children: [
                {
                  path: '/',
                  component: () =>
                    import('./views/purchasing-management/procurement-return/procurement-return.vue'),
                  meta: {
                    // crumbList: ['首页', '采购管理', '采购退货'],
                    crumbList: [
                      {
                        href:'javascript:;',
                        name:'首页'
                      },
                      {
                        href:'javascript:;',
                        name:'采购管理'
                      },
                      {
                        href:'javascript:;',
                        name:'采购退货'
                      },
                    ],
                    title: '采购退货-进销存系统',
                  }
                },
                // ==================== 查看采购订单===========================
                {
                  path: 'detail/:purchaseReturnId',
                  component: () =>
                    import('./views/purchasing-management/procurement-return/procurement-return-detail.vue'),
                  meta: {
                    // crumbList: ['首页', '采购管理', '采购退货', '查看采购退货单'],
                    crumbList: [
                      {
                        href:'javascript:;',
                        name:'首页'
                      },
                      {
                        href:'javascript:;',
                        name:'采购管理'
                      },
                      {
                        href:'/purchasing-management/procurement-return/',
                        name:'采购退货'
                      },
                      {
                        href:'javascript:;',
                        name:'查看采购退货单'
                      },
                    ],
                    title: '采购退货-进销存系统',
                  }
                },
              ],
            },
          ]
        },
        // ====================销售管理===========================
        {
          path: 'sales-management',
          redirect: 'sales-management/discount-authority',
          component: () =>
            import('./views/sales-management/layout.vue'),
          children: [
            // ===================折扣权限===========================
            {
              path: 'discount-authority',
              component: () =>
                import('./views/sales-management/discount-authority/discount-authority.vue'),
              meta: {
                // crumbList: ['首页', '销售管理', '折扣管理'],
                crumbList: [
                  {
                    href:'javascript:;',
                    name:'首页'
                  },
                  {
                    href:'javascript:;',
                    name:'销售管理'
                  },
                  {
                    href:'javascript:;',
                    name:'折扣管理'
                  },
                ],
                title: '折扣管理-进销存系统',
              }
            },
            {
              path: 'sales-orders',
              component: () =>
                import('./views/sales-management/sales-orders/layout.vue'),
              children: [
                // ==================== 销售订单===========================
                {
                  path: '/',
                  component: () =>
                    import('./views/sales-management/sales-orders/sales-orders.vue'),
                  meta: {
                    // crumbList: ['首页', '销售管理', '销售单'],
                    crumbList: [
                      {
                        href:'javascript:;',
                        name:'首页'
                      },
                      {
                        href:'javascript:;',
                        name:'销售管理'
                      },
                      {
                        href:'javascript:;',
                        name:'销售单'
                      },
                    ],
                    title: '销售单-进销存系统',
                  }
                },
                // ==================== 新增销售订单===========================
                {
                  path: 'add',
                  component: () =>
                    import('./views/sales-management/sales-orders/sales-orders-add.vue'),
                  meta: {
                    // crumbList: ['首页', '销售管理', '销售单', '新增销售单'],
                    crumbList: [
                      {
                        href:'javascript:;',
                        name:'首页'
                      },
                      {
                        href:'javascript:;',
                        name:'销售管理'
                      },
                      {
                        href:'/sales-management/sales-orders/',
                        name:'销售单'
                      },
                      {
                        href:'javascript:;',
                        name:'新增销售单'
                      },
                    ],
                    title: '销售单-进销存系统',
                  }
                },
                // ==================== 销售订单-查看详情===========================
                {
                  path: 'detail/:orderId',
                  component: () =>
                    import('./views/sales-management/sales-orders/sales-orders-detail.vue'),
                  meta: {
                    // crumbList: ['首页', '销售管理', '销售单', '查看销售单'],
                    crumbList: [
                      {
                        href:'javascript:;',
                        name:'首页'
                      },
                      {
                        href:'javascript:;',
                        name:'销售管理'
                      },
                      {
                        href:'/sales-management/sales-orders/',
                        name:'销售单'
                      },
                      {
                        href:'javascript:;',
                        name:'查看销售单'
                      },
                    ],
                    title: '销售订单-进销存系统',
                  }
                },
              ]
            },
            {
              path: 'sales-returns',
              component: () =>
                import('./views/sales-management/sales-returns/layout.vue'),
              children: [
                // ==================== 销售退货===========================
                {
                  path: '/',
                  component: () =>
                    import('./views/sales-management/sales-returns/sales-returns.vue'),
                  meta: {
                    // crumbList: ['首页', '销售管理', '销售退货'],
                    crumbList: [
                      {
                        href:'javascript:;',
                        name:'首页'
                      },
                      {
                        href:'javascript:;',
                        name:'销售管理'
                      },
                      {
                        href:'javascript:;',
                        name:'销售退款'
                      },
                    ],
                    title: '销售退款-进销存系统',
                  }
                },
                // ==================== 销售退货-查看详情===========================
                {
                  path: 'detail/:orderId',
                  component: () =>
                    import('./views/sales-management/sales-returns/sales-returns-detail.vue'),
                  meta: {
                    // crumbList: ['首页', '销售管理', '销售退货', '查看销售退货单'],
                    crumbList: [
                      {
                        href:'javascript:;',
                        name:'首页'
                      },
                      {
                        href:'javascript:;',
                        name:'销售管理'
                      },
                      {
                        href:'/sales-management/sales-returns/',
                        name:'销售退款'
                      },
                      {
                        href:'javascript:;',
                        name:'查看销售退款单'
                      },
                    ],
                    title: '销售退款-进销存系统',
                  }
                },
              ]
            },
          ],
        },
        // ==================== 发料管理===========================
        {
          path: 'material-management',
          component: () =>
            import('./views/material-management/material-management/layout.vue'),
          children: [
            // ==================== 发料管理===========================
            {
              path: 'list',
              component: () =>
                import('./views/material-management/material-management/material-management.vue'),
              meta: {
                // crumbList: ['首页', '发料管理','发料单'],
                crumbList: [
                  {
                    href:'javascript:;',
                    name:'首页'
                  },
                  {
                    href:'javascript:;',
                    name:'发料管理'
                  },
                  {
                    href:'javascript:;',
                    name:'发料单'
                  },
                ],
                title: '发料单-进销存系统',
              }
            },
            // ==================== 发料管理-发料单===========================
            {
              path: 'list/work-material-detail/:id',
              component: () =>
                import('./views/material-management/material-management/work-material-detail.vue'),
              meta: {
                // crumbList: ['首页', '发料管理', '发料单','查看发料单'],
                crumbList: [
                  {
                    href:'javascript:;',
                    name:'首页'
                  },
                  {
                    href:'javascript:;',
                    name:'发料管理'
                  },
                  {
                    href:'/material-management/list/',
                    name:'发料单'
                  },
                  {
                    href:'javascript:;',
                    name:'查看发料单'
                  },
                ],
                title: '发料单-进销存系统',
              }
            },
            // ==================== 发料管理-工单退料===========================
            {
              path: 'list/work-material-refund-detail/:id',
              component: () =>
                import('./views/material-management/material-management/work-material-refund-detail.vue'),
              meta: {
                // crumbList: ['首页', '发料管理','发料单','查看发料单'],
                crumbList: [
                  {
                    href:'javascript:;',
                    name:'首页'
                  },
                  {
                    href:'javascript:;',
                    name:'发料管理'
                  },
                  {
                    href:'/material-management/list/',
                    name:'发料单'
                  },
                  {
                    href:'javascript:;',
                    name:'查看发料单'
                  },
                ],
                title: '发料单-进销存系统',
              }
            },
            // ==================== 发料管理-销售发料===========================
            {
              path: 'list/sales-material-detail/:id',
              component: () =>
                import('./views/material-management/material-management/sales-material-detail.vue'),
              meta: {
                // crumbList: ['首页', '发料管理', '发料单','查看发料单'],
                crumbList: [
                  {
                    href:'javascript:;',
                    name:'首页'
                  },
                  {
                    href:'javascript:;',
                    name:'发料管理'
                  },
                  {
                    href:'/material-management/list/',
                    name:'发料单'
                  },
                  {
                    href:'javascript:;',
                    name:'查看发料单'
                  },
                ],
                title: '发料单-进销存系统',
              }
            },
          ],
        },
        // ==================== 库存管理===========================
        {
          path: 'inventory-management',
          redirect: 'inventory-management/commodity-inventory/',
          component: () =>
            import('./views/inventory-management/layout.vue'),
          children: [
            // ==================== 商品库存===========================
            {
              path: 'commodity-inventory',
              component: () =>
                import('./views/inventory-management/commodity-inventory/layout.vue'),
              children: [
                {
                  path: '/',
                  component: () =>
                    import('./views/inventory-management/commodity-inventory/commodity-inventory.vue'),
                  meta: {
                    // crumbList: ['首页', '库存管理', '商品库存'],
                    crumbList: [
                      {
                        href:'javascript:;',
                        name:'首页'
                      },
                      {
                        href:'javascript:;',
                        name:'库存管理'
                      },
                      {
                        href:'javascript:;',
                        name:'商品库存'
                      },
                    ],
                    title: '商品库存-进销存系统',
                  }
                },
              ],
            },
            // ====================采购入库===========================
            {
              path: 'purchase-warehousing',
              component: () =>
                import('./views/inventory-management/purchase-warehousing/layout.vue'),
              children: [
                {
                  path: '/',
                  component: () =>
                    import('./views/inventory-management/purchase-warehousing/purchase-warehousing.vue'),
                  meta: {
                    // crumbList: ['首页', '库存管理', '采购入库'],
                    crumbList: [
                      {
                        href:'javascript:;',
                        name:'首页'
                      },
                      {
                        href:'javascript:;',
                        name:'库存管理'
                      },
                      {
                        href:'javascript:;',
                        name:'采购入库'
                      },
                    ],
                    title: '采购入库-进销存系统',
                  }
                },
                {
                  path: 'detail/:wareId',
                  component: () =>
                    import('./views/inventory-management/purchase-warehousing/purchase-warehousing-detail.vue'),
                  meta: {
                    // crumbList: ['首页', '库存管理','采购入库', '查看采购入库单'],
                    crumbList: [
                      {
                        href:'javascript:;',
                        name:'首页'
                      },
                      {
                        href:'javascript:;',
                        name:'库存管理'
                      },
                      {
                        href:'/inventory-management/purchase-warehousing/',
                        name:'采购入库'
                      },
                      {
                        href:'javascript:;',
                        name:'查看采购入库单'
                      },
                    ],
                    title: '采购入库-进销存系统',
                  }
                },
              ],
            },
            // ====================调拨入库===========================
            {
              path: 'allocation-warehousing',
              component: () =>
                import('./views/inventory-management/allocation-warehousing/layout.vue'),
              children: [
                {
                  path: '/',
                  component: () =>
                    import('./views/inventory-management/allocation-warehousing/allocation-warehousing.vue'),
                  meta: {
                    // crumbList: ['首页', '调拨管理', '调拨入库'],
                    crumbList: [
                      {
                        href:'javascript:;',
                        name:'首页'
                      },
                      {
                        href:'javascript:;',
                        name:'调拨管理'
                      },
                      {
                        href:'javascript:;',
                        name:'调拨入库'
                      },
                    ],
                    title: '调拨入库-进销存系统',
                  }
                },
                {
                  path: 'detail/:inputUserId',
                  component: () =>
                    import('./views/inventory-management/allocation-warehousing/allocation-warehousingDetail.vue'),
                  meta: {
                    // crumbList: ['首页', '调拨管理','调拨入库','查看调拨入库单'],
                    crumbList: [
                      {
                        href:'javascript:;',
                        name:'首页'
                      },
                      {
                        href:'javascript:;',
                        name:'调拨管理'
                      },
                      {
                        href:'/inventory-management/allocation-warehousing/',
                        name:'调拨入库'
                      },
                      {
                        href:'javascript:;',
                        name:'查看调拨入库单'
                      },
                    ],
                    title: '调拨入库-进销存系统',
                  }
                },
              ],
            },
            // ====================盘盈入库===========================
            {
              path: 'inventory-surplus',
              component: () =>
                import('./views/inventory-management/inventory-surplus/layout.vue'),
              children: [
                {
                  path: '/',
                  component: () =>
                    import('./views/inventory-management/inventory-surplus/inventory-surplus.vue'),
                  meta: {
                    // crumbList: ['首页', '盘点管理', '盘盈入库'],
                    crumbList: [
                      {
                        href:'javascript:;',
                        name:'首页'
                      },
                      {
                        href:'javascript:;',
                        name:'盘点管理'
                      },
                      {
                        href:'javascript:;',
                        name:'盘盈入库'
                      },
                    ],
                    title: '盘盈入库-进销存系统',
                  }
                },
                {
                  path: 'detail/:surplusId',
                  component: () =>
                    import('./views/inventory-management/inventory-surplus/inventory-surplusDetail.vue'),
                  meta: {
                    // crumbList: ['首页', '盘点管理', '盘盈入库', '查看盘盈入库单'],
                    crumbList: [
                      {
                        href:'javascript:;',
                        name:'首页'
                      },
                      {
                        href:'javascript:;',
                        name:'盘点管理'
                      },
                      {
                        href:'/inventory-management/inventory-surplus/',
                        name:'盘盈入库'
                      },
                      {
                        href:'javascript:;',
                        name:'查看盘盈入库单'
                      },
                    ],
                    title: '盘盈入库-进销存系统',
                  }
                },
              ],
            },
            // ===================发料出库===========================
            {
              path: 'material-out',
              component: () =>
                import('./views/inventory-management/layout.vue'),
              children: [
                {
                  path: '/',
                  component: () =>
                    import('./views/inventory-management/material-out/material-out.vue'),
                  meta: {
                    // crumbList: ['首页', '发料管理', '发料出库'],
                    crumbList: [
                      {
                        href:'javascript:;',
                        name:'首页'
                      },
                      {
                        href:'javascript:;',
                        name:'发料管理'
                      },
                      {
                        href:'javascript:;',
                        name:'发料出库'
                      },
                    ],
                    title: '发料出库-进销存系统',
                  }
                },
                {
                  path: 'detail/id/:id/businessType/:businessType',
                  component: () =>
                    import('./views/inventory-management/material-out/material-outDetail.vue'),
                  meta: {
                    // crumbList: ['首页', '发料管理','发料出库','查看出库单'],
                    crumbList: [
                      {
                        href:'javascript:;',
                        name:'首页'
                      },
                      {
                        href:'javascript:;',
                        name:'发料管理'
                      },
                      {
                        href:'/inventory-management/material-out/',
                        name:'发料出库'
                      },
                      {
                        href:'javascript:;',
                        name:'查看出库单'
                      },
                    ],
                    title: '发料出库-进销存系统',
                  }
                },
              ],
            },

            // ===================内领出库===========================
            {
              path: 'inner-out',
              component: () =>
                import('./views/inventory-management/layout.vue'),
              children: [
                {
                  path: '/',
                  component: () =>
                    import('./views/inventory-management/inner-out/innerOut.vue'),
                  meta: {
                    // crumbList: ['首页', '库存管理', '内领出库'],
                    crumbList: [
                      {
                        href:'javascript:;',
                        name:'首页'
                      },
                      {
                        href:'javascript:;',
                        name:'库存管理'
                      },
                      {
                        href:'javascript:;',
                        name:'内领出库'
                      },
                    ],
                    title: '内领出库-进销存系统',
                  }
                },
                {
                  path: 'detail/:innerOutId',
                  component: () =>
                    import('./views/inventory-management/inner-out/inner-outDetail.vue'),
                  meta: {
                    // crumbList: ['首页', '库存管理','内领出库','查看出库单'],
                    crumbList: [
                      {
                        href:'javascript:;',
                        name:'首页'
                      },
                      {
                        href:'javascript:;',
                        name:'库存管理'
                      },
                      {
                        href:'/inventory-management/inner-out/',
                        name:'内领出库'
                      },
                      {
                        href:'javascript:;',
                        name:'查看出库单'
                      },
                    ],
                    title: '内领出库-进销存系统',
                  }
                },
                {
                  path: 'add',
                  component: () =>
                    import('./views/inventory-management/inner-out/inner-outAdd.vue'),
                  meta: {
                    // crumbList: ['首页', '库存管理', '内领出库', '新增出库单'],
                    crumbList: [
                      {
                        href:'javascript:;',
                        name:'首页'
                      },
                      {
                        href:'javascript:;',
                        name:'库存管理'
                      },
                      {
                        href:'/inventory-management/inner-out/',
                        name:'内领出库'
                      },
                      {
                        href:'javascript:;',
                        name:'新增出库单'
                      },
                    ],
                    title: '内领出库-进销存系统',
                  }
                },
              ],
            },
            // ===================调拨出库===========================
            {
              path: 'allocation-out',
              component: () =>
                import('./views/inventory-management/layout.vue'),
              children: [
                {
                  path: '/',
                  component: () =>
                    import('./views/inventory-management/allocation-out/allocationOut.vue'),
                  meta: {
                    // crumbList: ['首页', '调拨管理', '调拨出库'],
                    crumbList: [
                      {
                        href:'javascript:;',
                        name:'首页'
                      },
                      {
                        href:'javascript:;',
                        name:'调拨管理'
                      },
                      {
                        href:'javascript:;',
                        name:'调拨出库'
                      },
                    ],
                    title: '调拨出库-进销存系统',
                  }
                },
                {
                  path: 'detail/:outputUserId',
                  component: () =>
                    import('./views/inventory-management/allocation-out/allocation-outDetail.vue'),
                  meta: {
                    // crumbList: ['首页', '调拨管理','调拨出库','查看出库单'],
                    crumbList: [
                      {
                        href:'javascript:;',
                        name:'首页'
                      },
                      {
                        href:'javascript:;',
                        name:'调拨管理'
                      },
                      {
                        href:'/inventory-management/allocation-out/',
                        name:'调拨出库'
                      },
                      {
                        href:'javascript:;',
                        name:'查看出库单'
                      },
                    ],
                    title: '调拨出库-进销存系统',
                  }
                },
              ],
            },
            // ===================盘亏出库===========================
            {
              path: 'loss-out',
              component: () =>
                import('./views/inventory-management/layout.vue'),
              children: [
                {
                  path: '/',
                  component: () =>
                    import('./views/inventory-management/loss-out/loss-out.vue'),
                  meta: {
                    // crumbList: ['首页', '盘点管理', '盘亏出库'],
                    crumbList: [
                      {
                        href:'javascript:;',
                        name:'首页'
                      },
                      {
                        href:'javascript:;',
                        name:'盘点管理'
                      },
                      {
                        href:'javascript:;',
                        name:'盘亏出库'
                      },
                    ],
                    title: '盘亏出库-进销存系统',
                  }
                },
                {
                  path: 'detail/:outId',
                  component: () =>
                    import('./views/inventory-management/loss-out/loss-outDetail.vue'),
                  meta: {
                    // crumbList: ['首页', '盘点管理','盘亏出库','查看出库单'],
                    crumbList: [
                      {
                        href:'javascript:;',
                        name:'首页'
                      },
                      {
                        href:'javascript:;',
                        name:'盘点管理'
                      },
                      {
                        href:'/inventory-management/loss-out/',
                        name:'盘亏出库'
                      },
                      {
                        href:'javascript:;',
                        name:'查看出库单'
                      },
                    ],
                    title: '盘亏出库-进销存系统',
                  }
                },
              ],
            },
          ],
        },
        // ====================报表===========================
        {
          path: 'report-form',
          redirect: 'report-form/inventory-data',
          component: () =>
            import('./views/report-form/layout.vue'),
          children: [
            // ===================库存数据===========================
            {
              path: 'inventory-data',
              component: () =>
                import('./views/report-form/inventory-data.vue'),
              meta: {
                // crumbList: ['首页', '报表', '库存数据'],
                crumbList: [
                  {
                    href:'javascript:;',
                    name:'首页'
                  },
                  {
                    href:'javascript:;',
                    name:'报表'
                  },
                  {
                    href:'javascript:;',
                    name:'库存数据'
                  },
                ],
                title: '库存数据-进销存系统',
              }
            },
            // ===================配件出库数据===========================
            {
              path: 'parts-outgoing-data',
              component: () =>
                import('./views/report-form/parts-outgoing-data.vue'),
              meta: {
                // crumbList: ['首页', '报表', '配件出库数据'],
                crumbList: [
                  {
                    href:'javascript:;',
                    name:'首页'
                  },
                  {
                    href:'javascript:;',
                    name:'报表'
                  },
                  {
                    href:'javascript:;',
                    name:'配件出库数据'
                  },
                ],
                title: '配件出库数据-进销存系统',
              }
            },
            // ===================配件入库数据===========================
            {
              path: 'parts-warehousing-data',
              component: () =>
                import('./views/report-form/parts-warehousing-data.vue'),
              meta: {
                // crumbList: ['首页', '报表', '配件入库数据'],
                crumbList: [
                  {
                    href:'javascript:;',
                    name:'首页'
                  },
                  {
                    href:'javascript:;',
                    name:'报表'
                  },
                  {
                    href:'javascript:;',
                    name:'配件入库数据'
                  },
                ],
                title: '配件入库数据-进销存系统',
              }
            },
            // ===================进销存数据===========================
            {
              path: 'purchase-sale-stock-data',
              component: () =>
                import('./views/report-form/purchase-sale-stock-data.vue'),
              meta: {
                // crumbList: ['首页', '报表', '进销存数据'],
                crumbList: [
                  {
                    href:'javascript:;',
                    name:'首页'
                  },
                  {
                    href:'javascript:;',
                    name:'报表'
                  },
                  {
                    href:'javascript:;',
                    name:'进销存数据'
                  },
                ],
                title: '进销存数据-进销存系统',
              }
            },
          ],
        },
        // ====================配件调拨===========================
        {
          path: 'allocation-management',
          // redirect: 'allocation-management/parts-allocation',
          component: () =>
            import('./views/allocation-management/layout.vue'),
          children: [
            // ====================配件调拨===========================
            {
              path: 'parts-allocation',
              component: () =>
                import('./views/allocation-management/layout.vue'),
              children: [
                {
                  path: '/',
                  component: () =>
                    import('./views/allocation-management/parts-allocation/parts-allocation.vue'),
                  meta: {
                    // crumbList: ['首页', '配件管理','调拨单'],
                    crumbList: [
                      {
                        href:'javascript:;',
                        name:'首页'
                      },
                      {
                        href:'javascript:;',
                        name:'配件管理'
                      },
                      {
                        href:'javascript:;',
                        name:'调拨单'
                      },
                    ],
                    title: '调拨单-进销存系统',
                  }
                },
                {
                  path: 'add',
                  component: () =>
                    import('./views/allocation-management/parts-allocation/parts-allocationAdd.vue'),
                  meta: {
                    // crumbList: ['首页','配件管理','调拨单','新增调拨单'],
                    crumbList: [
                      {
                        href:'javascript:;',
                        name:'首页'
                      },
                      {
                        href:'javascript:;',
                        name:'配件管理'
                      },
                      {
                        href:'/allocation-management/parts-allocation/',
                        name:'调拨单'
                      },
                      {
                        href:'javascript:;',
                        name:'新增调拨单'
                      },
                    ],
                    title: '调拨单-进销存系统',
                  }
                },
                {
                  path: 'detail/:allocationId',
                  component: () =>
                    import('./views/allocation-management/parts-allocation/parts-allocationDetail.vue'),
                  meta: {
                    // crumbList: ['首页','配件管理','调拨单', '查看调拨单'],
                    crumbList: [
                      {
                        href:'javascript:;',
                        name:'首页'
                      },
                      {
                        href:'javascript:;',
                        name:'配件管理'
                      },
                      {
                        href:'/allocation-management/parts-allocation/',
                        name:'调拨单'
                      },
                      {
                        href:'javascript:;',
                        name:'查看调拨单'
                      },
                    ],
                    title: '调拨单-进销存系统',
                  }
                },
              ],
            },
            // ====================调拨在途===========================
            {
              path: 'allocation-onWay',
              component: () =>
                import('./views/allocation-management/layout.vue'),
              children: [
                {
                  path: '/',
                  component: () =>
                    import('./views/allocation-management/allocation-onWay/allocation-onWay.vue'),
                  meta: {
                    // crumbList: ['首页', '配件管理','调拨单'],
                    crumbList: [
                      {
                        href:'javascript:;',
                        name:'首页'
                      },
                      {
                        href:'javascript:;',
                        name:'调拨管理'
                      },
                      {
                        href:'javascript:;',
                        name:'调拨在途'
                      },
                    ],
                    title: '调拨在途-进销存系统',
                  }
                },
              ],
            },

          ]
        },
        // ====================盘点管理===========================
        {
          path: 'calculate-management',
          redirect: 'calculate-management/inventory-management',
          component: () =>
            import('./views/calculate-management/layout.vue'),
          children: [
            {
              path: 'inventory-management',
              component: () =>
                import('./views/calculate-management/inventory-management/layout.vue'),
              children: [
                {
                  path: '/',
                  component: () =>
                    import('./views/calculate-management/inventory-management/inventory-management.vue'),
                  meta: {
                    // crumbList: ['首页', '盘点管理','盘点调整单'],
                    crumbList: [
                      {
                        href:'javascript:;',
                        name:'首页'
                      },
                      {
                        href:'javascript:;',
                        name:'盘点管理'
                      },
                      {
                        href:'javascript:;',
                        name:'盘点调整单'
                      },
                    ],
                    title: '盘点调整单-进销存系统',
                  }
                },
                {
                  path: 'add',
                  component: () =>
                    import('./views/calculate-management/inventory-management/inventory-managementAdd.vue'),
                  meta: {
                    // crumbList: ['首页', '盘点管理','盘点调整单','新增盘点调整单'],
                    crumbList: [
                      {
                        href:'javascript:;',
                        name:'首页'
                      },
                      {
                        href:'javascript:;',
                        name:'盘点管理'
                      },
                      {
                        href:'/calculate-management/inventory-management/',
                        name:'盘点调整单'
                      },
                      {
                        href:'javascript:;',
                        name:'新增盘点调整单'
                      },
                    ],
                    title: '盘点调整单-进销存系统',
                  }
                },
                {
                  path: 'detail/:calculateId',
                  component: () =>
                    import('./views/calculate-management/inventory-management/inventory-managementDetail.vue'),
                  meta: {
                    // crumbList: ['首页', '盘点管理','盘点调整单','查看盘点调整单'],
                    crumbList: [
                      {
                        href:'javascript:;',
                        name:'首页'
                      },
                      {
                        href:'javascript:;',
                        name:'盘点管理'
                      },
                      {
                        href:'/calculate-management/inventory-management/',
                        name:'盘点调整单'
                      },
                      {
                        href:'javascript:;',
                        name:'查看盘点调整单'
                      },
                    ],
                    title: '盘点调整单-进销存系统',
                  }
                },
              ],
            },
            // ===================成本调整===========================
            {
              path: 'cost-adjust',
              component: () =>
                import('./views/calculate-management/cost-adjust/layout.vue'),
              children: [
                {
                  path: '/',
                  component: () =>
                    import('./views/calculate-management/cost-adjust/costAdjustment.vue'),
                  meta: {
                    crumbList: [
                      {
                        href:'javascript:;',
                        name:'首页'
                      },
                      {
                        href:'javascript:;',
                        name:'盘点管理'
                      },
                      {
                        href:'javascript:;',
                        name:'入库成本调整'
                      },
                    ],
                    title: '入库成本调整-进销存系统',
                  }
                },
                // ==================== 新增成本调整单===========================
                {
                  path: 'add',
                  component: () =>
                    import('./views/calculate-management/cost-adjust/costAdjustmentAdd.vue'),
                  meta: {
                    crumbList: [
                      {
                        href:'javascript:;',
                        name:'首页'
                      },
                      {
                        href:'javascript:;',
                        name:'盘点管理'
                      },
                      {
                        href:'/calculate-management/cost-adjust/',
                        name:'成本调整'
                      },
                      {
                        href:'javascript:;',
                        name:'新增成本调整单'
                      },
                    ],
                    title: '成本调整-进销存系统',
                  }
                },
                {
                  path: 'detail/:adjustId',
                  component: () =>
                    import('./views/calculate-management/cost-adjust/costAdjustmentDetail.vue'),
                  meta: {
                    crumbList: [
                      {
                        href:'javascript:;',
                        name:'首页'
                      },
                      {
                        href:'javascript:;',
                        name:'盘点管理'
                      },
                      {
                        href:'/calculate-management/cost-adjust/',
                        name:'成本调整'
                      },
                      {
                        href:'javascript:;',
                        name:'查看成本调整单'
                      },
                    ],
                    title: '成本调整-进销存系统',
                  }
                },
              ],
            },
            // ===================异常调整===========================
            {
              path:'unusual-adjust',
              component: () =>
                import('./views/calculate-management/unusual-adjust/layout.vue'),
              children:[
                {
                  path: '/',
                  component: () =>
                    import('./views/calculate-management/unusual-adjust/unusualAdjustment.vue'),
                  meta: {
                    crumbList: [
                      {
                        href:'javascript:;',
                        name:'首页'
                      },
                      {
                        href:'javascript:;',
                        name:'盘点管理'
                      },
                      {
                        href:'javascript:;',
                        name:'异常调整'
                      },
                    ],
                    title: '异常调整-进销存系统',
                  }
                },
                {
                  path: 'add',
                  component: () => import('./views/calculate-management/unusual-adjust/unusualAdjustmentAdd.vue'),
                  meta: {
                    crumbList: [
                      {
                        href: 'javascript:;',
                        name: '首页'
                      },
                      {
                        href: 'javascript:;',
                        name: '盘点管理'
                      },
                      {
                        href: 'javascript:;',
                        name: '新增异常调整'
                      },
                    ],
                    title: '异常调整-进销存系统',
                  }
                },
                {
                  path: 'detail/:adjustId',
                  component: () => import('./views/calculate-management/unusual-adjust/unusualAdjustmentDetail.vue'),
                  meta: {
                    crumbList: [
                      {
                        href: 'javascript:;',
                        name: '首页'
                      },
                      {
                        href: 'javascript:;',
                        name: '盘点管理'
                      },
                      {
                        href: 'javascript:;',
                        name: '查看异常调整单'
                      },
                    ],
                    title: '异常调整-进销存系统',
                  }
                }
              ]
            }
          ]
        },
        // ====================历史工单处理===========================
        {
          path: 'history-management',
          redirect: 'history-management/order-management',
          component: () =>
            import('./views/history-management/layout.vue'),
          children: [
            {
              path: 'order-management',
              component: () =>
                import('./views/history-management/layout.vue'),
              children: [
                {
                  path: '/',
                  component: () =>
                    import('./views/history-management/order-management/order-management.vue'),
                  meta: {
                    // crumbList: ['首页','未结算工单','未结算工单列表'],
                    crumbList: [
                      {
                        href:'javascript:;',
                        name:'首页'
                      },
                      {
                        href:'javascript:;',
                        name:'未结算工单'
                      },
                      {
                        href:'javascript:;',
                        name:'未结算工单列表'
                      },
                    ],
                    title: '未结算工单列表-进销存系统',
                  }
                },
                {
                  path: 'detail/order/:order/orderId/:orderId',
                  component: () =>
                    import('./views//history-management/order-management/order-managementDetail.vue'),
                  meta: {
                    // crumbList: ['首页', '未结算工单','未结算工单列表', '查看未结算工单'],
                    crumbList: [
                      {
                        href:'javascript:;',
                        name:'首页'
                      },
                      {
                        href:'javascript:;',
                        name:'未结算工单'
                      },
                      {
                        href:'/history-management/order-management/',
                        name:'未结算工单列表'
                      },
                      {
                        href:'javascript:;',
                        name:'查看未结算工单'
                      },
                    ],
                    title: '未结算工单列表-进销存系统',
                  }
                },
              ],
            },
          ]
        },
        // ====================移库管理===========================
        {
          path: 'transition-management',
          redirect: 'transition-management/wavehouse-management',
          component: () =>
            import('./views/transition-management/layout.vue'),
          children: [
            // ====================配件调拨===========================
            {
              path: 'wavehouse-management',
              component: () =>
                import('./views/transition-management/layout.vue'),
              children: [
                {
                  path: '/',
                  component: () =>
                    import('./views/transition-management/wavehouse-management.vue'),
                  meta: {
                    // crumbList: ['首页','库存管理','移库记录'],
                    crumbList: [
                      {
                        href:'javascript:;',
                        name:'首页'
                      },
                      {
                        href:'javascript:;',
                        name:'库存管理'
                      },
                      {
                        href:'javascript:;',
                        name:'移库记录'
                      },
                    ],
                    title: '移库记录-进销存系统',
                  }
                },
              ],
            },
          ]
        },
      ],
      meta: {
        auth: true,
      }
    }
  ]
})
//
router.beforeEach((to, from, next) => {
  // Vue.prototype.__cancels__.forEach((cancel) => {
  //   cancel();
  // });
  // Vue.prototype.__cancels__ = [];
  const token = Cookies.get('token');
  if(to.matched.some(m => m.meta.auth)) {
    if(token) {
      next()
    } else {
      // next({
        // path: '/auth/login',
        // query: {
        //   returnUrl: to.fullPath
        // }
      // })
      // window.location.href="http://athena.n-cars.com.cn/admin/login.html";
      // window.location.href="http://ydntest.n-cars.com.cn";
       if(window.location.href.indexOf('http://jk.n-cars.com.cn')>-1||window.location.href.indexOf('localhost')>-1){
         // window.open('http://yadianna.n-cars.com.cn/admin/login.html','_blank');
         window.location.href='http://yadianna.n-cars.com.cn/admin/login.html';
       }else{
         window.location.href='http://athena.n-cars.com.cn';
       }
    }
  } else {
    next()
  }
});
//
// router.onError((error) => {
//   // const pattern = /Loading chunk (\d)+ failed/g;
//   // const isChunkLoadFailed = error.message.match(pattern);
//   // if(isChunkLoadFailed){
//   //   // 用路由的replace方法，并没有相当于F5刷新页面，失败的js文件并没有从新请求，会导致一直尝试replace页面导致死循环，而用 location.reload 方法，相当于触发F5刷新页面，虽然用户体验上来说会有刷新加载察觉，但不会导致页面卡死及死循环，从而曲线救国解决该问题
//   //   location.reload();
//   //   // const targetPath = $router.history.pending.fullPath;
//   //   // $router.replace(targetPath);
//   // }
//   const pattern = /Loading chunk (\d)+ failed/g;
//
//   const isChunkLoadFailed = error.message.match(pattern);
//
//   const targetPath = router.history.pending.fullPath;
//   if (isChunkLoadFailed) {
//     router.replace(targetPath);
//   }
//
// });
/*router.onError((error) => {
  const pattern = /Loading chunk (\d)+ failed/g;
  const isChunkLoadFailed = error.message.match(pattern);
  const targetPath = router.history.pending.fullPath;
  if (isChunkLoadFailed) {
    router.replace('targetPath');
  }
});*/
router.onError((err) => {
  const pattern = /Loading chunk (\d)+ failed/g;
  const isChunkLoadFailed = err.message.match(pattern);
  if (isChunkLoadFailed) {
    let chunkBool = sessionStorage.getItem('chunkError');
    let nowTimes = Date.now();
    if (chunkBool === null || chunkBool && nowTimes - parseInt(chunkBool) > 60000) {//路由跳转报错,href手动跳转
      sessionStorage.setItem('chunkError', 'reload');
      const targetPath = routers.history.pending.fullPath;
      window.location.href = window.location.origin + targetPath;
    }else if(chunkBool === 'reload'){ //手动跳转后依然报错,强制刷新
      sessionStorage.setItem('chunkError', Date.now());
      window.location.reload(true);
    }
  }
})
export default router
