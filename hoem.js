const d= document.querySelector('.date');

const t=new Date();

const week= ['sun','mon','tue','wed','thu','fri','sat','sun'];
const month=['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec']

let day;
if(t.getDate()<=10)
{
    day=0+t.getDate();
}
else
{
    day=t.getDate();
}

let hours;

if(t.getHours()>12)
{
    hours=t.getHours()-12;
}
else
{
    hours=t.getHours();
}

if(hours<10)
{
    hours='0'+hours;
}

let min;

if(t.getMinutes()<10)
{
    min='0'+t.getMinutes();
}
else
{
    min=t.getMinutes();
}

let seq;

if(t.getHours()>=12)
{
    seq='PM';
}
else
{
    seq="AM";
}
d.innerHTML=week[t.getDay()] +' | '+month[t.getMonth()]+" "+day +" | "+hours+":"+min+" "+seq;
