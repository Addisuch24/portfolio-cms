function getPaginationMeta(totalItems, page, limit) {

    const totalPages = Math.ceil(totalItems / limit);

    return {
        page,
        limit,
        totalItems,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1
    };

}

module.exports = getPaginationMeta;