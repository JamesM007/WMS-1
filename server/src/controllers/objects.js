const db = require("../db");

exports.clearObjects = async(req, res) =>{
    try{
    await db.query(
        "delete from objects"
    );
    return res.status(201).json({
        success: true,
        message: `canvas cleared`,
    });
} catch (error) {
    console.log(`Error: ${error.message}`);
    return res.status(500).json({
        error: error.message,
    });
}
};

exports.saveObjects = async (req, res) => {
    const { id, type, x, y, width, height, image, fill } = req.body;
    try {
        await db.query(
            "insert into objects(id, type, x, y, width, height, image, fill) values ($1, $2, $3, $4, $5, $6, $7, $8)",
            [id, type, x, y, width, height, image, fill]
        );
        return res.status(201).json({
            success: true,
            message: `${type} with ${id} of has been saved`,
        });
    } catch (error) {
        console.log(`Error: ${error.message}`);
        return res.status(500).json({
            error: error.message,
        });
    }
};
