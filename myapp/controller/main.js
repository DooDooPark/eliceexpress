const mainscreen = (req, res) => {
    res.render('index', { title: 'Express' });
}

module.exports = {
    mainscreen
}