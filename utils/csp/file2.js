// iframe protection
app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "default-src 'self';"+"script-src 'self' 'nonce-randomkey' unsafe-inline' https://cdn.jsdelivr.net;"+"frame-src 'self' https://cdn.jsdelivr.net");
    next();
});

app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "default-src 'self';"+"script-src 'self' 'nonce-randomkey' unsafe-inline' https://cdn.jsdelivr.net;"+"frame-src 'self' https://cdn.jsdelivr.net;"+"style-src 'self' 'nonce-randomkey' https://cdn.jsdelivr.net");
    next();
});