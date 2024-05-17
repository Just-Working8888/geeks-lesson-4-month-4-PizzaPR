function Pagination({ onPageChange, currentPage }) {
    const tatal = 5
    const handleClick = (page) => [
        onPageChange(page)
    ]
    const pages = []
    for (let i = 1; i < tatal; i++) {
        pages.push(i)
    }
    return (
        <div className="pagination">
            {
                pages.map((page) => (
                    <button onClick={() => handleClick(page)}>
                        {page}
                    </button>
                ))
            }
        </div>
    )
}

export default Pagination