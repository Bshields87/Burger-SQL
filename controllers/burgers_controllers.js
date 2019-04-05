var express = require("express");

var router = express.Router();
var bodyParser = require('body-parser')
var burger = require("../models/burger");


router.get("/", function (req, res) {
    burger.all(function (burgers) {

        console.log(burgers);

        res.render("index", { burgers })
    });
});
 router.get("/api/burger", function (req, res){
     burger.all(function(burgers){
         console.log(burgers);
         res.render(burgers)
     });
 });
router.post("/api/burgers", function (req, res) {
    burger.create(["burger_name", "devoured"],
        [req.body.name, req.body.devoured],

        function (result) {
            res.json({ id: result.insertId });
           
        });

console.log(req.body.name);
});

router.put("/api/burgers/:id", function (req, res) {
    var condition = "id = " + req.params.id;

    console.log("condition", condition);
    console.log(req.body.devoured)
    burger.update(
        {
            devoured: req.body.devoured
        },
        condition, function (result) {
            if (result.changedRows === 0) {

                return res.status(404).end();
            } else {
                res.status(200).end();
            }
        });
});


module.exports = router;