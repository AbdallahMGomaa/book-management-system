const sequelize = require("../db");

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
        response.status(200).json(results)
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
        response.status(200).json(results)
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
        response.status(200).json(results)
    }
    catch (error) {
        response.status(400).json({error: error.message})
    }
}

module.exports = {getBorrowedFiltered, getAllBorrowedLastMonth, getOverdueBorrowedLastMonth}