var express = require('express');
var router = express.Router();
var Country = require('../models/dataSchema');

router.post('/create', (req, res, next) => {
var newCountry = new Country({
    name: req.body.name,
    capital: req.body.capital,
});

newCountry
    .save()
    .then((country) => {
     res.status(200).json({ msg: country });
    })
    .catch((err) => {
     res.status(500).json({ errmsg: err });
    });
});

router.get('/read', (req, res, next) => {
Country.find()
    .then((countries) => {
     res.status(200).json({ msg: countries });
    })
    .catch((err) => {
     res.status(500).json({ errmsg: err });
    });
});

router.put('/update', (req, res, next) => {
Country.findById(req.body._id)
    .then((country) => {
     if (!country) {
        res.status(404).json({ msg: 'Country not found' });
     } else {
        country.name = req.body.name;
        country.capital = req.body.capital;
        return country.save();
     }
    })
    .then((updatedCountry) => {
     res.status(200).json({ msg: updatedCountry });
    })
    .catch((err) => {
     res.status(500).json({ errmsg: err });
    });
});

router.delete('/delete/:id', (req, res, next) => {
Country.findOneAndRemove({ _id: req.params.id })
    .then((country) => {
     if (!country) {
        res.status(404).json({ msg: 'Country not found' });
     } else {
        res.status(200).json({ msg: country });
     }
    })
    .catch((err) => {
     res.status(500).json({ errmsg: err });
    });
});

module.exports = router;