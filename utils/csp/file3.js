//security headers
app.use((req, res, next) => {
    res.setHeader("X-XSS-Protection", "1; mode=block");
    next();
});
app.use((req, res, next) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    next();
});
app.use((req, res, next) => {
    res.removeHeader('X-Powered-By');
    next();
});
app.use((req, res, next) => {
    res.setHeader("Referrer-Policy", "no-referrer");
    next();
});
//ye http ko https mai convert krega
app.use((req,res,next)=>{
    res.setHeader("Strict-Transport-Security", "max-age=31536000");
    next();
})
//logic to redirect
const redirectToHttps=(req,res,next)=>{
    if(req.headers["x-forwarded-proto"]!=="https"){
        return res.redirect(`https://${req.headers.host}${req.url}`);
    }
    next();
}
app.use(redirectToHttps);