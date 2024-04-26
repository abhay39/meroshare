import { ArrowRightLeft, BarChart, ClipboardList, Globe, Home, MessageSquareHeart, NotebookPen, Repeat2, ShoppingBasket, User } from "lucide-react";

export const links=[
    {
        id:1,
        name:"Dashboard",
        icon:<Home size={18}/>,
        link:"/home"
    },
    {
        id:2,
        name:"My Details",
        icon:<User size={18}/>,
        link:"/home/myDetails"
    },
    {
        id:3,
        name:"My Shares",
        icon:<BarChart size={18}/>,
        link:"/home/myShares"
    },
    {
        id:4,
        name:"My Transaction History",
        icon:<Repeat2 size={18}/>,
        link:"/home/myTransactionHistory"
    },
    {
        id:5,
        name:"My Portfolio",
        icon:<ClipboardList size={18}/>,
        link:"/home/myPortfolio"
    },
    {
        id:6,
        name:"My Pledge Share Details",
        icon:<NotebookPen size={18}/>,
        link:"/home/myPledgeShareDetails"
    },
    {
        id:7,
        name:"My Bank Request",
        icon:<MessageSquareHeart size={18}/>,
        link:"/home/myBankRequest"
    },
    {
        id:8,
        name:"My ASBA",
        icon:<Globe size={18}/>,
        link:"/home/myAsba"
    },
    {
        id:9,
        name:"My Purchase Source",
        icon:<ShoppingBasket size={18}/>,
        link:"/home/myPurchaseSource"
    },
    {
        id:10,
        name:"My EDIS",
        icon:<ArrowRightLeft size={18}/>,
        link:"/home/myEdis"
    },

]