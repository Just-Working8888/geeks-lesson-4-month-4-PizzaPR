import '../scss/app.scss';
import logo from '../assets/img/pizza-logo.svg'
import PizzaBlock from '../components/PizzaBlock';
import { useContext, useEffect, useState } from 'react';
import Categories from '../components/Categories/Categories';
import { Skeleton } from '../components/PizzaBlock/Sceleton';
import Sort from '../components/Sort/Sort';
import { ThemeContext } from '../App';



const sorts = [{
    id: 1,
    value: 'rating',
    name: 'популярности (DESC)'
},
{
    id: 2,
    value: '-rating',
    name: 'популярности (ASC)'
},
{
    id: 3,
    value: 'price',
    name: 'цене (DESC)'
},
{
    id: 4,
    value: '-price',
    name: 'цене (ASC)'
},
{
    id: 5,
    value: 'title',
    name: 'алфавиту (DESC)'
},
{
    id: 6,
    value: '-title',
    name: 'алфавиту (ASC)'
}
]


function HomePage() {
    const { isDarkMode, toggleTheme } = useContext(ThemeContext);
    console.log(isDarkMode, 'fdsfsd');
    const [data, setData] = useState(null)
    const [curentCategory, setCurentCategory] = useState(1)
    const [curentSort, setCurentSort] = useState(0)
    const [loadings, setLoadings] = useState(false)
    function onChangeCategory(id) {
        setCurentCategory(id)
    }

    useEffect(() => {
        const sortBy = sorts[curentSort].value.replace('-', '')
        const order = sorts[curentSort].value.includes('-') ? 'asc' : 'desc'
        console.log(sortBy);


        const url = new URL('https://6367b246edc85dbc84d9ba5d.mockapi.io/products');
        url.searchParams.append('category', curentCategory);
        url.searchParams.append('sortBy', sortBy);
        url.searchParams.append('order', order);
        const fetchData = async () => {
            setLoadings(true)
            try {
                const response = await fetch(url)
                if (!response.ok) {
                    new Error('Ошибка загрузки данных')
                }
                const result = await response.json()
                setData(result)
            } catch (error) {
                console.log(error);
            } finally {
                setLoadings(false)
            }
        }
        fetchData()
    }, [curentCategory, curentSort])

    const pizzas = data?.map(item => <PizzaBlock item={item} />)
    const sceletons = [1, 2, 3, 4, 5, 6, 7, 8].map((item) => <Skeleton />)




    useEffect(() => {
        document.body.style.background = isDarkMode ? 'linear-gradient(34deg, rgba(47, 86, 218, 1) 11%, rgba(22, 241, 190, 1) 82%)' : ""
    }, [isDarkMode])
    return (
        <div style={isDarkMode ? { background: '#892be25c' } : {}} class="wrapper" >
            <div class="header">
                <div class="container">
                    <div class="header__logo">
                        <img width="38" src={logo} alt="Pizza logo" />
                        <div>
                            <h1>React Pizza</h1>
                            <p>самая вкусная пицца во вселенной</p>
                        </div>
                    </div>
                    <button onClick={() => toggleTheme()}>dark</button>
                    <div class="header__cart">
                        <a href="/cart.html" class="button button--cart">
                            <span>520 ₽</span>
                            <div class="button__delimiter"></div>
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 18 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M6.33333 16.3333C7.06971 16.3333 7.66667 15.7364 7.66667 15C7.66667 14.2636 7.06971 13.6667 6.33333 13.6667C5.59695 13.6667 5 14.2636 5 15C5 15.7364 5.59695 16.3333 6.33333 16.3333Z"
                                    stroke="white"
                                    stroke-width="1.8"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                                <path
                                    d="M14.3333 16.3333C15.0697 16.3333 15.6667 15.7364 15.6667 15C15.6667 14.2636 15.0697 13.6667 14.3333 13.6667C13.597 13.6667 13 14.2636 13 15C13 15.7364 13.597 16.3333 14.3333 16.3333Z"
                                    stroke="white"
                                    stroke-width="1.8"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                                <path
                                    d="M4.78002 4.99999H16.3334L15.2134 10.5933C15.1524 10.9003 14.9854 11.176 14.7417 11.3722C14.4979 11.5684 14.1929 11.6727 13.88 11.6667H6.83335C6.50781 11.6694 6.1925 11.553 5.94689 11.3393C5.70128 11.1256 5.54233 10.8295 5.50002 10.5067L4.48669 2.82666C4.44466 2.50615 4.28764 2.21182 4.04482 1.99844C3.80201 1.78505 3.48994 1.66715 3.16669 1.66666H1.66669"
                                    stroke="white"
                                    stroke-width="1.8"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                            </svg>
                            <span>3</span>
                        </a>
                    </div>
                </div>
            </div>
            <div class="content">
                <div class="container">
                    <div class="content__top">
                        <Categories onChangeCategory={onChangeCategory} value={curentCategory} />
                        <Sort setCurentSort={setCurentSort} curentSort={curentSort} sorts={sorts} />
                    </div>
                    <h2 class="content__title">Все пиццы</h2>
                    <div class="content__items">
                        {
                            !loadings ? pizzas : sceletons
                        }
                    </div>
                </div>
            </div>
        </div >
    );
}

export default HomePage