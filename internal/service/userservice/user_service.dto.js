const FilterReqDto = (req) => ({
    currentPage: req.currentPage,
    pageSize: req.pageSize
});

const UserInfoDto = (req) => ({
    id: req._id,
    name: req.name,
    email: req.email,
    phoneNumber: req.phone_number,
    address: req.address,
    avartarUrl: req.avatar_url,
    dob: req.dob,
    role: req.role
});


module.exports = { UserInfoDto, FilterReqDto };