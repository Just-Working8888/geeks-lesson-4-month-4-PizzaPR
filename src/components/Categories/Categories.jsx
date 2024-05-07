

const filters = [{
    id: 1,
    value: 1,
    label: 'Все'
},
{
    id: 2,
    value: 2,
    label: 'Мясные'
},
{
    id: 3,
    value: 3,
    label: 'Вегетарианская'
},
{
    id: 4,
    value: 4,
    label: 'Гриль'
},
{
    id: 5,
    value: 5,
    label: 'Острые'
},
{
    id: 6,
    value: 6,
    label: 'Закрытые'
}
]
function Categories({ value, onChangeCategory }) {
    return (
        <div class="categories">
            <ul>
                {
                    filters.map((item, index) =>
                        <li className={value === item.id ? 'active' : ''} key={item.id} onClick={() => onChangeCategory(item.id)}>{item.label}</li>
                    )
                }
            </ul>
        </div >
    )
}

export default Categories