Accounts.onCreateUser((options, user) => {
    // add any additional logic to creating a user
    // like adding icon ...
    return user;
});

WebApp.connectHandlers.use("/add", function(req, res, next) {
    console.log("req: ", req.query);
    
    try{
        check(req.query, { username: String
                         , password: String
                         //, token: String
        });
    } catch (err){
        res.writeHead(200);
        res.end("there has been an error");
    }
    
    Accounts.createUser(req.query);

    res.writeHead(200);
    res.end(JSON.stringify(req.query));
});
