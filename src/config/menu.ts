export interface Menu {
    menu_link?: string
    menu_name?: string
    menu_path?: string
    menu_icon?: string
    children?: Menu[]
}

const subMenu: Menu[] = [
    {
        menu_name: '首页',
        menu_path: '/'
    }
]

export default subMenu
