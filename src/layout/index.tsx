import React, { useState, useEffect } from 'react'
import { Layout, Menu, Button, theme, Flex, Avatar, Dropdown, Space, Divider, Badge } from 'antd'
import type { MenuProps } from 'antd'
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
    DashboardOutlined,
    SettingOutlined,
    BellOutlined,
    LogoutOutlined,
    ProfileOutlined
} from '@ant-design/icons'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useWindowSize } from '@hooks'

const { Header, Sider, Content } = Layout

const MainLayout: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false)
    const [notices, setNotices] = useState<any[]>([
        {
            id: '1',
            title: '系统通知',
            content: '系统将在今晚23:00-24:00进行维护升级',
            type: 'info',
            read: false,
            createdAt: new Date().toISOString()
        },
        {
            id: '2',
            title: '任务完成',
            content: '指派给你的任务已经完成',
            type: 'success',
            read: false,
            createdAt: new Date().toISOString()
        }
    ])

    const navigate = useNavigate()
    const location = useLocation()
    const windowSize = useWindowSize()
    const {
        token: { colorBgContainer, borderRadiusLG }
    } = theme.useToken()

    // 根据当前路径设置选中的菜单项
    const [selectedKeys, setSelectedKeys] = useState<string[]>(['dashboard'])

    // 当窗口宽度小于768px时自动折叠侧边栏
    useEffect(() => {
        if (windowSize.width < 768) {
            setCollapsed(true)
        } else {
            setCollapsed(false)
        }
    }, [windowSize.width])

    useEffect(() => {
        const pathname = location.pathname
        if (pathname === '/') {
            setSelectedKeys(['dashboard'])
        } else if (pathname.startsWith('/users')) {
            setSelectedKeys(['users'])
        } else if (pathname.startsWith('/settings')) {
            setSelectedKeys(['settings'])
        }
    }, [location.pathname])

    // 处理通知点击
    const handleNoticeClick = (id: string) => {
        setNotices((prev) => prev.map((notice) => (notice.id === id ? { ...notice, read: true } : notice)))
    }

    // 处理退出登录
    const handleLogout = () => {
        console.log('用户登出')
        // 这里可以添加登出逻辑
    }

    // 菜单项配置
    const menuItems = [
        {
            key: 'dashboard',
            icon: <DashboardOutlined />,
            label: '仪表盘',
            onClick: () => navigate('/')
        },
        {
            key: 'users',
            icon: <UserOutlined />,
            label: '用户管理',
            onClick: () => navigate('/users')
        },
        {
            key: 'settings',
            icon: <SettingOutlined />,
            label: '系统设置',
            onClick: () => navigate('/settings')
        }
    ]

    // 用户下拉菜单
    const userMenuItems: MenuProps['items'] = [
        {
            key: 'profile',
            icon: <ProfileOutlined />,
            label: '个人资料'
        },
        {
            key: 'settings',
            icon: <SettingOutlined />,
            label: '账户设置'
        },
        {
            type: 'divider'
        },
        {
            key: 'logout',
            icon: <LogoutOutlined />,
            label: '退出登录',
            onClick: handleLogout
        }
    ]

    // 通知菜单项
    const noticeMenuItems: MenuProps['items'] = notices.map((notice) => ({
        key: notice.id,
        label: (
            <div>
                <div style={{ fontWeight: notice.read ? 'normal' : 'bold' }}>{notice.title}</div>
                <div>{notice.content}</div>
            </div>
        ),
        onClick: () => handleNoticeClick(notice.id)
    }))

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                width={200}
                className="scrollbar-container"
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    zIndex: 999
                }}
            >
                <div
                    className="logo"
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: '#fff',
                        fontSize: collapsed ? '1rem' : '1.2rem',
                        fontWeight: 'bold'
                    }}
                >
                    {collapsed ? 'LT' : 'Life After Tool'}
                </div>
                <Menu theme="dark" mode="inline" selectedKeys={selectedKeys} items={menuItems} style={{ flex: 1 }} />
                <Divider style={{ margin: '0', borderColor: 'rgba(255,255,255,0.1)' }} />
                <Flex justify="center" align="center" style={{ padding: '16px 0' }}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{ color: '#fff', fontSize: '16px' }}
                    />
                </Flex>
            </Sider>
            <Layout style={{ marginLeft: collapsed ? 80 : 200, transition: 'all 0.2s' }}>
                <Header style={{ padding: '0 16px', background: colorBgContainer, boxShadow: '0 1px 4px rgba(0,21,41,.08)' }}>
                    <Flex align="center" justify="space-between" style={{ height: '100%' }}>
                        <h2 style={{ margin: 0 }}>后台管理系统</h2>
                        <Space size={16}>
                            <Dropdown menu={{ items: noticeMenuItems }} placement="bottomRight" trigger={['click']}>
                                <Badge count={notices.filter((n) => !n.read).length} overflowCount={99}>
                                    <Button type="text" icon={<BellOutlined />} style={{ fontSize: '18px' }} />
                                </Badge>
                            </Dropdown>
                            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
                                <Space style={{ cursor: 'pointer' }}>
                                    <Avatar icon={<UserOutlined />} />
                                    <span>管理员</span>
                                </Space>
                            </Dropdown>
                        </Space>
                    </Flex>
                </Header>
                <Content
                    className="scrollbar-container"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                        minHeight: 280,
                        overflow: 'auto'
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    )
}

export default MainLayout
