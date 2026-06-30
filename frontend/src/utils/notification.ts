import { type Notification } from "../types/notification/notification";

export interface NotificationGroup {

    title:string;

    notifications:Notification[];

}

export function groupNotifications(

notifications:Notification[]

):NotificationGroup[]{

const today=new Date();

const yesterday=new Date();

yesterday.setDate(today.getDate()-1);

const groups={

Today:[] as Notification[],

Yesterday:[] as Notification[],

Older:[] as Notification[],

};

notifications.forEach(notification=>{

const date=new Date(notification.createdAt);

if(date.toDateString()===today.toDateString()){

groups.Today.push(notification);

}

else if(

date.toDateString()===yesterday.toDateString()

){

groups.Yesterday.push(notification);

}

else{

groups.Older.push(notification);

}

});

return Object.entries(groups)

.filter(([,notifications])=>notifications.length>0)

.map(([title,notifications])=>({

title,

notifications,

}));

}