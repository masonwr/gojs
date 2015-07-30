Template.registerHelper('getSessionVal', (key) => {
    return Session.get(key);
});
