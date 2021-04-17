import React from "react";

const Search = () => {
    return (
        <div className= "container">
            <h1 className = "search grid">Search</h1>
            <div>Let's get started</div>
            <input
                onChange={this.handleChange}
                name = "searchbox"
                className="form-control font-italic"
                placeholder="Enter the place you  want to serach"
            />

        </div>

    )
}

export default Search;