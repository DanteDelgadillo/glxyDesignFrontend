import React, { useState, useEffect } from "react"
import Layout from "./Layout"
import Card from "./Card"
import { getCategories, getFilteredProducts } from "./apiCore"
import CheckBox from './CheckBox'
import RadioBox from './RadioBox'
import { prices } from "./FixedPrices"
import Pagination from "./Pagination"
import Card2 from "./Card2"

const Shop = () => {
    const [myFilters, setMyFilters] = useState({
        filters: {
            category: [],
            price: []

        }
    })
    const [categories, setCategories] = useState([])
    const [error, setError] = useState(false)
    const [limit] = useState(5)
    const [skip, setSkip] = useState(0)
    const [size, setSize] = useState(0)
    const [filteredResults, setFilteredResults] = useState([])

    //   ******** pagination   *********
    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage] = useState(8)

    //   ******** seachbar   *********
    const [seachBarData, setSeachBarData] = useState("")

    const init = () => {
        getCategories()
            .then(data => {
                if (data.error) {

                    setError(data.error)

                } else {
                    setCategories(data)
                }
            })
    }

    useEffect(() => {
        init()
        loadFilterResults(skip, limit, myFilters.filters)

    }, [])

    const handleFilters = (filters, filterBy) => {
        // console.log("shop", filters, filterBy)
        const newFilter = { ...myFilters }
        newFilter.filters[filterBy] = filters

        if (filterBy === "price") {
            let priceValues = handlePrice(filters);
            newFilter.filters[filterBy] = priceValues
        }

        loadFilterResults(myFilters.filters)

        setMyFilters(newFilter)

    }

    const handlePrice = value => {
        const data = prices
        let array = []

        for (let key in data) {
            if (data[key]._id === parseInt(value)) {
                array = data[key].array
            }
        }
        return array;
    }

    const loadFilterResults = (newFilter) => {
        // console.log(newFilter)
        getFilteredProducts(skip, limit, newFilter)
            .then(data => {
                if (data.error) {
                    setError(data.error)
                } else {
                    setFilteredResults(data.data)
                    setSize(data.size)
                    setSkip(0)
                }
            })
    }

    // filter with search bar 
    const searchBarFilter = filteredResults.filter(product => {
        return (

            product.name
                .toLowerCase()
                .includes(seachBarData.toLowerCase()) +
            product.description
                .toLowerCase()
                .includes(seachBarData.toLowerCase())
            + product.category.name
                .toLowerCase()
                .includes(seachBarData.toLowerCase())
        );
    })


    // // get current post paginate
    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPost = searchBarFilter.slice(indexOfFirstPost, indexOfLastPost);

    // change page
    const paginate = pageNumer => {
        setCurrentPage(pageNumer)
    }

    return (
        <div>
            <Layout

                title="Product Page" description=" Ecomerce app" className="container-fluid"
            >   </Layout>

            <div>
                <form className="searchBar">
                    <label>
                        <h3>Search:</h3>
                    </label>
                    <input
                        className="form-control"
                        name="searchbar"
                        type="text"
                        id="searchbar"
                        value={seachBarData}
                        onChange={e => setSeachBarData(e.target.value)}
                    />
                </form>
            </div>

            <div class="searcContainer">
                <div>
                    <h3>Filter By Categories </h3>
                    <ul>
                        <CheckBox categories={categories} handleFilters={filters =>
                            handleFilters(filters, 'category')} />
                    </ul>

                </div>
                <div>
                    <h3>Filter By Price Range </h3>
                    <ul className="rbox">
                        <RadioBox
                            prices={prices}
                            handleFilters={filters =>
                                handleFilters(filters, "price")
                            }

                        />
                    </ul>
                </div>

            </div>

            <div >
                <h2 className="pName">Products:</h2>
                <div className="homeContainer">
                    {currentPost.map((product, i) => (

                        <div key={i} className="">
                            <Card2 product={product}></Card2>
                        </div>

                    ))}
                </div>
                <hr></hr>
                <Pagination
                    postPerPage={postPerPage}
                    totalPost={filteredResults.length}
                    paginate={paginate}
                />
            </div>

        </div>

    )
}

export default Shop;