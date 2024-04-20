// its will stop other resources to stop

app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "default-src 'self'");
    next();
});
//it will help to execute only selected scripts
app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "default-src 'self';"+"script-src 'self' https://cdn.jsdelivr.net");
    next();
});
//its will help to execute inline script
app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "default-src 'self';"+"script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net");
    next();
});
//wahi script load hogi jisme nonce diya hoga
app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "default-src 'self';"+"script-src 'self' 'nonce-randomkey' unsafe-inline' https://cdn.jsdelivr.net");
    next();
});