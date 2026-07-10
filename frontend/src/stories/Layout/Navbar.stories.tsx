import type { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";

import Navbar from "../../components/navigation/student/StudentNavbar";


const meta:Meta<typeof Navbar>={

title:"Layout/Navbar",

component:Navbar,

tags:["autodocs"],


decorators:[
(Story)=>(
<MemoryRouter>
<div className="w-full">
<Story/>
</div>
</MemoryRouter>
)
]

};


export default meta;


type Story=StoryObj<typeof Navbar>;



export const Default:Story={

args:{
onMenuClick:()=>{},
onToggleSidebar:()=>{}
}

};