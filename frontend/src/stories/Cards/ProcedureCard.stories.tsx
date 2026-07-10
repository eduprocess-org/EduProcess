import type {Meta,StoryObj} from "@storybook/react";

import ProcedureCard from "../../components/procedures/student/ProcedureCard";

import {MemoryRouter} from "react-router-dom";


const meta:Meta<typeof ProcedureCard>={

title:"Cards/ProcedureCard",

component:ProcedureCard,

tags:["autodocs"],


decorators:[
(Story)=>(
<MemoryRouter>
<div className="max-w-sm">
<Story/>
</div>
</MemoryRouter>
)
]


};


export default meta;



type Story=StoryObj<typeof ProcedureCard>;



export const Default:Story={

args:{
procedure:{
id:"1",
name:"Certificate Request",
description:"Request an academic certificate through EduProcess.",
category:"Academic",
estimatedProcessingTime:"3 business days"
}
}

};