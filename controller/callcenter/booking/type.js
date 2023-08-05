const filterReq = (req) => ({
    currentPageStr: req.current_page,
    pageSizeStr: req.page_size
});

module.exports = {
    filterReq
};
