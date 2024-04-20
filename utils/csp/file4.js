//feature policy
app.use((req,res,next)=>{
    res.setHeader('Feature-Policy','geolocation \'none\'; microphone \'none\'; camera \'none\'');
    next();
})