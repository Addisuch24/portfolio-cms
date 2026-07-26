function getPagination(page = 1, limit = 10) {
    page = parseInt(page);
    limit = parseInt(limit);

    if (isNaN(page) || page < 1) page = 1;
    if (isNaN(limit) || limit < 1) limit = 10;

    const offset = (page - 1) * limit;

    return {
        page,
        limit,
        offset
    };
}

module.exports = getPagination;