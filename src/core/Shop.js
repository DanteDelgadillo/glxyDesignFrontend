import React, { useState, useEffect } from "react"
import Layout from "./Layout"
import Card from "./Card"
import { getCategories, getFilteredProducts } from "./apiCore"
import CheckBox from './CheckBox'
import RadioBox from './RadioBox'
import { prices } from "./FixedPrices"

const Shop = () => {
    const [myFilters, setMyFilters] = useState({
        filters: {
            category: [],
            price: []

        }
    })
    const [categories, setCategories] = useState([])
    const [error, setError] = useState(false)
    const [limit, setLimit] = useState(5)
    const [skip, setSkip] = useState(0)
    const [size, setSize] = useState(0)
    const [filteredResults, setFilteredResults] = useState([])

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

        if (filterBy == "price") {
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

    const loadMore = () => {
        let toSkip = skip + limit

        getFilteredProducts(skip, limit, myFilters.filters)
            .then(data => {
                if (data.error) {
                    setError(data.error)
                } else {
                    setFilteredResults([...filteredResults, ...data.data])
                    setSize(data.size)
                    setSkip(toSkip)
                }
            })
    }

    const loadMoreButton = () => {
        return (
            size > 0 && size >= limit && (
                <button onClick={loadMore} className="btn btn-warning mb-5">
                    loadMore
             </button>
            )
        )
    }

    return (
        <Layout
            title="Product Page" description=" Ecomerce app" className="container-fluid"
        >
            <div className="row">
                <div className="col-4">
                    <h4>Filter By Categories </h4>
                    <ul>
                        <CheckBox categories={categories} handleFilters={filters =>
                            handleFilters(filters, 'category')} />
                    </ul>

                    <h4>Filter By Price Range </h4>
                    <ul>
                        <RadioBox
                            prices={prices}
                            handleFilters={filters =>
                                handleFilters(filters, "price")
                            }

                        />
                    </ul>
                </div>
                <div className="col-8">
                    <h2 className="mb-4">Products</h2>
                    <div className="row">
                        {filteredResults.map((product, i) => (

                            <div key={i} className="col-4 mb-3">
                                <Card product={product}></Card>
                            </div>

                        ))}
                    </div>
                    <hr></hr>
                    {loadMoreButton()}
                </div>
            </div>

        </Layout>
    )
}

export default Shop;