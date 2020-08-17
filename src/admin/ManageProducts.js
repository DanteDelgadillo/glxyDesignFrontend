import React, { useState, useEffect } from 'react';
import Layout from "../core/Layout"
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { deleteProduct, updateProduct, getProduct, getProducts } from "./apiAdmin"
import { API } from "../config"
// *********** images imports***********
import Pen from "../images/edit_pen.png";
import TrashCan from "../images/delete_trash.png"

// *********** Pagination imports***********
import Pagination from "../core/Pagination"

const ManageProducts = () => {
    const [products, setProducts] = useState([])

    const { user, token } = isAuthenticated()

    const [seachBarData, setSeachBarData] = useState("")

    //   ******** pagination   *********
    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage] = useState(4)

    const loadProducts = () => {
        getProducts()
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                } else {
                    setProducts(data)
                }
            })
    }

    const destroy = productId => {
        deleteProduct(productId, user._id, token)
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                } else {
                    loadProducts()
                }
            })
    }

    useEffect(() => {
        loadProducts()
    }, [])

    // filter with search bar 
    const searchBarFilter = products.filter(product => {
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
            <Layout title="Manage Products" description="CRUD Products" >
            </Layout >
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

            <div className="table-responsive">
                <table className="table productT">
                    <tr>
                        <th>Image</th>
                        <th style={{ paddingLeft: "150px" }}>Name</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                    <tbody>

                        {currentPost.map((p, i) => (
                            <tr key={i} >
                                <td className="test">   <img src={`${API}/product/photo/${p._id}`} alt={p.name} style={{ height: "300px", width: "300px" }} /></td>
                                <td> <h3 style={{ paddingLeft: "200px" }}>{p.name}</h3></td>
                                <td><Link to={`/admin/product/update/${p._id}`}> <img src={Pen} className="images" alt="pen" /></Link></td>
                                <td><button type="button" onClick={() => destroy(p._id)} className="btn "><img src={TrashCan} className="images" alt="trash" /></button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
            <hr />
            <Pagination
                postPerPage={postPerPage}
                totalPost={products.length}
                paginate={paginate}

            />

        </div>
    );

}

export default ManageProducts
