
exports.createEvent = async(req , res) => {
        try {
            res.send('555555')
        } catch (error) {
            console.log(error);
            res.status(500).send('server error')
        }
}