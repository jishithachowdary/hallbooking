const express=require("express");
const app=express();
const port=5000;
app.use(express.json());

//creating rooms

const rooms=[];
rooms.push({room:1,amenities:["mic","speakers","chairs","maindesk"],seats:100,price:2000});
rooms.push({room:2,amenities:["chairs","maindesk"],seats:100,price:1000});
rooms.push({room:3,amenities:["mic","speakers","chairs","maindesk"],seats:100,price:2000})

app.get("/",(req,res)=>{
    res.status(200).json({rooms})
})

app.post('/rooms', (req, res) => {
    const r={room:rooms.length+1,amenities:req.body.amenities,seats:req.body.seats,price:req.body.price}
    rooms.push(r)
    res.send(r);
});


//Room Booking

const booking=[];
booking.push({name:"jishitha",date:"01-08-2021",start_time:6,end_time:18,room:1});

app.get("/bookings",(req,res)=>{
    res.status(200).json({booking})
})

app.post('/booking', (req, res) => {
    const r={name:req.body.name,date:req.body.date,start_time:req.body.start_time,end_time:req.body.end_time,room:req.body.room}
    let count=0;
    for(let i=0;i<booking.length;i++){
        if(booking[i].room==r.room){
            if(booking[i].date===r.date){
                if(r.start_time>=booking[i].start_time && r.start_time<=booking[i].end_time){
                    count=count+1;
                }
            }
        }
    }
    if(count==0){
        console.log("done");
        booking.push(r)
        res.send(r);
    }else{
        res.status(200).send("booking full please try for another room");
    }
    
});

//list of all rooms with particular booking date 

app.get("/allrooms/:date",(req,res)=>{
    const all_rooms=[];
    let count=0;
    for(let i=0;i<rooms.length;i++){
        for(let j=0;j<booking.length;j++){
            if(rooms[i].room==booking[j].room){  
                if( booking[j].date==req.params.date){
                    count=count+1;
                    all_rooms.push({room:booking[j].room,status:"booked",name:booking[j].name,date:booking[j].date,start_time:booking[j].start_time,end_time:booking[j].end_time});
                }
            }
        }
    }
    if(count==0){
        res.status(200).send("all rooms are avialable for booking");
    }
    else{
        res.status(200).json({all_rooms})
    }
})

//list of all customers with particular booking date

app.get("/customers/:date",(req,res)=>{
    const all_bookings=[];
    let count=0;
    for(let i=0;i<rooms.length;i++){
        for(let j=0;j<booking.length;j++){
            if(rooms[i].room==booking[j].room){  
                if( booking[j].date==req.params.date){
                    count=count+1;
                    all_bookings.push({name:booking[j].name,room:booking[j].room,date:booking[j].date,start_time:booking[j].start_time,end_time:booking[j].end_time});
                }
            }
        }
    }
    if(count==0){
        res.status(200).send("No rooms are booked by the customer");
    }
    else{
        res.status(200).json({all_bookings})
    }
})


app.listen(port,()=>{
    console.log(`server Listenong in post ${port}`)
})