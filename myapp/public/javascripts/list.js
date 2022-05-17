const btn = document.getElementById('list'); //목록으로
const update = document.getElementById('update'); //수정하기
const del = document.getElementById('delete'); //삭제하기.

btn.addEventListener('click', () => {
    location.href = '/blog';
})

del.addEventListener('click', () => {
    fetch(`http://localhost:3000/blog/delete/${del.dataset.doc}`, {
        method: 'DELETE',
    })
        .then(res => res.json())
        .then(data => window.location.href = data.redirect)
        .catch(err => console.log(err));
});

// 글 no. 정보를 찾아야 될 것.
// 그 찾은 정보를 삭제할 것.
// 목록에서 다시 반영할 것.

// router.delete;
// router.post;

// 삭제가 완료 되었다는 메세지 => 클라이언트에 전달.
// 클라이언트가 특정 동작을 하도록. => 경로 이동을 하도록.