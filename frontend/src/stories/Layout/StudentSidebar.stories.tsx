import type { Meta, StoryObj } from "@storybook/react";
import Sidebar from "../../components/navigation/student/StudentSidebar";


const meta: Meta<typeof Sidebar> = {

title:"Layout/StudentSidebar",

component:Sidebar,

tags:["autodocs"],

decorators:[
(Story)=>(
<div className="h-screen">
<Story/>
</div>
)
],

argTypes:{
isCollapsed:{
control:"boolean"
}
}

};


export default meta;


type Story = StoryObj<typeof Sidebar>;


export const Default:Story={
args:{
isCollapsed:false
}
};


export const Mobile:Story={
args:{
isCollapsed:true
}
};