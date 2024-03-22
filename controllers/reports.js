const sequelize = require("../db")
const { Parser } = require('json2csv')

async function getBorrowedFiltered(request, response) {
    try {
        const {start, end} = request.query
        const results = await sequelize.query(
            `
            SELECT 
                bb.id borrow_process_id, 
                bb."borrowedBy" borrower_id,
                bw.name borrower_name,
                bb."isReturned" is_returned,
                bb."returnedAt" returned_at,
                bb."dueDate" due_date,
                bb."createdAt" created_at,
                bk.title book_title
            FROM "BorrowedBooks" bb
            JOIN "Borrowers" bw on bb."borrowedBy" = bw.id
            JOIN "Books" bk on bk.id = bb."bookId"
            WHERE bb."createdAt" >= :start AND bb."createdAt" <= :end
            `,
            {replacements: {start, end}, type: sequelize.QueryTypes.SELECT}
        )
        const json2csvParser = new Parser({fields: ['borrow_process_id', 'borrower_id', 'borrower_name', 'is_returned', 'returned_at', 'due_date', 'created_at', 'book_title']})
        const csvData = json2csvParser.parse(results)
     
        response.header('Content-Type', 'text/csv')
        response.attachment('data.csv')
        response.send(csvData)

    }
    catch (error) {
        response.status(400).json({error: error.message})
    }
}


async function getAllBorrowedLastMonth(request, response) {
    try {
        const results = await sequelize.query(
            `
            SELECT 
                bb.id borrow_process_id, 
                bb."borrowedBy" borrower_id,
                bw.name borrower_name,
                bb."isReturned" is_returned,
                bb."returnedAt" returned_at,
                bb."dueDate" due_date,
                bb."createdAt" created_at,
                bk.title book_title
            FROM "BorrowedBooks" bb
            JOIN "Borrowers" bw on bb."borrowedBy" = bw.id
            JOIN "Books" bk on bk.id = bb."bookId"
            WHERE bb."createdAt" > CURRENT_DATE - INTERVAL '1 month'
            `,
            { type: sequelize.QueryTypes.SELECT}
        )
        const json2csvParser = new Parser({fields: ['borrow_process_id', 'borrower_id', 'borrower_name', 'is_returned', 'returned_at', 'due_date', 'created_at', 'book_title']})
        const csvData = json2csvParser.parse(results)
     
        response.header('Content-Type', 'text/csv')
        response.attachment('data.csv')
        response.send(csvData)
    }
    catch (error) {
        response.status(400).json({error: error.message})
    }
}

async function getOverdueBorrowedLastMonth(request, response) {
    try {
        const results = await sequelize.query(
            `
            SELECT 
                bb.id borrow_process_id, 
                bb."borrowedBy" borrower_id,
                bw.name borrower_name,
                bb."isReturned" is_returned,
                bb."returnedAt" returned_at,
                bb."dueDate" due_date,
                bb."createdAt" created_at,
                bk.title book_title
            FROM "BorrowedBooks" bb
            JOIN "Borrowers" bw on bb."borrowedBy" = bw.id
            JOIN "Books" bk on bk.id = bb."bookId"
            WHERE bb."createdAt" > CURRENT_DATE - INTERVAL '1 month' AND CURRENT_DATE > bb."dueDate"
            `,
            { type: sequelize.QueryTypes.SELECT}
        )
        const json2csvParser = new Parser({fields: ['borrow_process_id', 'borrower_id', 'borrower_name', 'is_returned', 'returned_at', 'due_date', 'created_at', 'book_title']})
        const csvData = json2csvParser.parse(results)
     
        response.header('Content-Type', 'text/csv')
        response.attachment('data.csv')
        response.send(csvData)
    }
    catch (error) {
        response.status(400).json({error: error.message})
    }
}

module.exports = {getBorrowedFiltered, getAllBorrowedLastMonth, getOverdueBorrowedLastMonth}