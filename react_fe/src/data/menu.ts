interface menuData{
    id: number;
    label: string;
    icon: string;
    path: string;
    color: string;
}
const menuData: menuData[] = [
    {
        id: 1,
        label: "Dashboard",
        icon: "ri-home-line",
        path: "/home", 
        color: "color-skyBlue",
    },
    {
        id: 2,
        label: "Charts",
        icon: "ri-line-chart-line",
        path: "/charts",
        color: "color-lightBrown",
    },
    {
        id: 3,
        label: "Create Blogs",
        icon: "ri-pencil-line",
        path: "/createBlog",
        color: "color-skyBlue",
    },
    {
        id: 4,
        label: "Edit Blogs",
        icon: "ri-edit-line",
        path: "/editBlog",
        color: "color-orange",
    }
];

export default menuData;