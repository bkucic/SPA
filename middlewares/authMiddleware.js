function checkAdministrator(req, res, next)
{
    if(!req.session.session)
    {
        return res.redirect("/login");
    }

    next();
}

function checkKupac(req, res, next)
{
    if(req.session.session)
    {
        return res.sendStatus(401);
    }

    next();
}

module.exports = {
    checkAdministrator,
    checkKupac
};