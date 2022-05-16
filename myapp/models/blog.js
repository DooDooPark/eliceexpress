const mongoose = require('mongoose');
const blogSchema = mongoose.Schema;

// 블로그 글 제목.
// 블로그 본 글 내용.

//auto-increment.

const blog = new blogSchema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const blogModel = mongoose.model('blog', blog);
module.exports = blogModel;