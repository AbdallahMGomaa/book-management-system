const { User } = require('../models/auth');
const {Borrower} = require('../models/borrowers')
const {createBorrowerService} = require('../services/borrowers');
const { generateToken } = require('../utils/auth');

async function getBorrowers(request, response) {
    try {
        const {password, ...filteredQuery} = request.query
        const borrowers = await Borrower.findAll({
            include: User,
            attributes: {exclude: ['password']},
            where: filteredQuery,
        });
        response.status(200).json(borrowers);
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
}

async function getBorrowerById(request, response) {
    try {
        const borrowerId = request.params.id;
        const borrower = await Borrower.findByPk(
            borrowerId, 
            {
                include: User,
                attributes: {exclude: ['password']}
            }
        );
        if (borrower) {
            response.status(200).json(borrower);
        } else {
            response.status(404).json({ error: "borrower not found" });
        }
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
}

async function createBorrower(request, response) {
    try {
        const {name, email, password} = request.body
        const {user, borrower} = await createBorrowerService(name, email, password)
        const token = generateToken(user)
        response.status(200).json({token, borrower});
    } catch (error) {
        response.status(400).json({ error: error.message });
    }
}

async function updateBorrower(request, response) {
    try {
        const borrowerId = request.params.id;
        const borrower = await Borrower.findByPk(borrowerId);
        if (Borrower) {
            const {name} = request.body
            await borrower.update({name});
            response.status(200).json(borrower);
        } else {
            response.status(404).json({ error: "borrower not found" });
        }
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
}

async function deleteBorrower(request, response) {
    try {
        const borrowerId = request.params.id;
        const borrower = await Borrower.findByPk(borrowerId);
        if (borrower) {
            await borrower.destroy()
            response.status(200).json({ message: 'borrower deleted successfully' })
        }
        else {
            response.status(404).json({ error: 'borrower not found' })
        }
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
}


module.exports = {getBorrowers, getBorrowerById, createBorrower, updateBorrower, deleteBorrower}