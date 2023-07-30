const User = require('../models/user.model');
const people = require('../assets/people.json');
const fs = require('fs');


class UserController {
    get(req, res) {
        const filter = req.query.filter;
        
        // console.log(filter);

        // fs.writeFile('mynewfile3.txt', 'Xin chào, đã nhận được yêu cầu của bạn', function (err) {
        //     if (err) 
        //         throw err;
        //     console.log('Saved!');
        // });

        // fs.appendFile('mynewfile3.txt', '\nthêm vào dòng tiếp theo', function (err) {
        //     if (err) 
        //         throw err;
        //     console.log('Saved!');
        // });


        try {
            const data = fs.readFileSync('mynewfile3.txt', 'utf8');
            return res.status(200).json({data});
        } catch (e) {
            return res.status(200).json({error: 'không thể đọc file'});
        }

        // const filterPeople = people.filter((person) => person.first_name.includes('a'));
        // return res.status(200).json({data: filterPeople, length: filterPeople.length});
    }

    post(req, res) {
        const filter = req.body.filter;
        // console.log('filter',filter);
        
        fs.appendFile('chao.txt', `Chào bạn + ${filter} \n`, function (err) {
            if (err) throw err;
            console.log('Saved!');
          });

        return res.status(200).json({result: 'Chào bạn '+ filter});
    }
}

module.exports = new UserController();