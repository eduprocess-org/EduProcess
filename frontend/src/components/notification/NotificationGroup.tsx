import NotificationCard from "./NotificationCard";

import { type Notification } from "../../types/notification/notification";

interface Props{

title:string;

notifications:Notification[];

onClick?:(notification:Notification)=>void;

}

export default function NotificationGroup({

title,

notifications,

onClick,

}:Props){

return(

<section className="space-y-3">

<h2
className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">

{title}

</h2>

<div className="space-y-3">

{

notifications.map(notification=>(

<NotificationCard

key={notification.id}

notification={notification}

onClick={onClick}

/>

))

}

</div>

</section>

);

}