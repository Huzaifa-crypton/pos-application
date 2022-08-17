import { Autocomplete, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./AddProduct.css";

import { Navigate, Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { baseURL } from "../../axios";

import { useSelector } from "react-redux";
import axios from "../../axios";

// import * as actions from "../../states/actionCreators/actions"
const AddProduct = (props) => {
  const product = useSelector((state) => state.editableProduct)


  useEffect(() => {
    console.log(product);
  }, [])
  const [currencyValue, setCurrencyValue] = useState(10)
  const [img, setImg] = useState(product?.url ? baseURL + "/" + product?.url : undefined);
  const [name, setName] = useState(product?.name || " ");
  const [desc, setDesc] = useState(product?.desc || " ");
  const [price, setPrice] = useState(product?.price || 0);
  const [stock, setStock] = useState(product?.stock || 0);
  const [discount, setDiscount] = useState(product?.discount || 0);
  const [ship, setShipTo] = useState(product?.ship || " ");
  const [currency, setCurrency] = useState(product?.currency || " ");
  const onImageChange = (e) => {
    const [file] = e.target.files;
    console.log(URL.createObjectURL(file));
    setImg(URL.createObjectURL(file));
  };
  // console.log(img)
  // console.log(product);

  async function updateProduct() {
    if ((name === "" || img === undefined || desc === "" || price < 0 || stock < 0 || discount < 0 || currency === "") || (name === " " || desc === " " || currency === " ")) {
      alert("Please provide correct or complete details of the product")
    }
    else {
      var formData = new FormData();
      var imagefile = document.querySelector('#file');
      console.log(imagefile.files[0]);
      console.log(product.url);

      formData.append("url", imagefile?.files[0] || product?.url);
      formData.append("name", name);
      formData.append("desc", desc);
      formData.append("price", price);
      formData.append("stock", stock);
      formData.append("ship", ship);
      formData.append("discount", discount);
      formData.append("currency", currency);
      await axios.put(`/update_product/${product._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }

      }).then(console.log("UPdated"))



    }
  }

  async function addProduct() {
    console.log(img)
    if ((name === "" || img === undefined || desc === "" || price < 0 || stock < 0 || discount < 0 || currency === "") || (name === " " || desc === " " || currency === " ")) {
      alert("Please provide correct or complete details of the product")
    }
    else {
      var formData = new FormData();
      var imagefile = document.querySelector('#file');
      console.log(imagefile)
      console.log(imagefile.files[0]);
      formData.append("url", imagefile.files[0]);
      formData.append("name", name);
      formData.append("desc", desc);
      formData.append("price", price);
      formData.append("stock", stock);
      formData.append("ship", ship);
      formData.append("discount", discount);
      formData.append("currency", currency);
      await axios.post('/add_product', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }

      })
    }
  }
  const onClickHandle = (type) => {
    if (type === "update") {
      updateProduct().then(setTimeout(() => {
        document.querySelector('#redirectingLink').click()
      }, 1000));
    }
    else if (type === "add") {
      addProduct().then(setTimeout(() => {
        document.querySelector('#redirectingLink').click()
      }, 1000));
    }
  }
  const user = useSelector((state) => state.currentUser);

  return (
    <>
      {user !== null ?
        <Grid
          container
          columnSpacing={{ xs: 0, sm: 0, md: 2 }}
          rowSpacing={{ xs: 2, sm: 2 }}
          justifyContent="center"
          alignItems="center"
          height="100%"
          p={3}
          style={{}}
        >
          <Grid
            item
            sm={12}
            xs={12}
            md={5}
            style={{
              display: "flex",
              flexDirection: "column",
              // justifyContent: "center",
              alignItems: "center"
            }}

          >
            <img src={img} alt="" className="productImage" />
            <Button variant="contained" component="label">
              {product?.url ? "Change Image" : "Upload Image"}
              <input
                hidden
                id="file"
                accept="image/*"
                multiple
                type="file"
                onChange={onImageChange}
              />
            </Button>
          </Grid>
          <Grid item sm={12} xs={12} md={7}>
            <Grid container direction="column" rowSpacing={3} style={{ justifyContent: "center" }}>
              <Grid item>
                <TextField
                  id="outlined-textarea"
                  label="Product Title"
                  value={name}
                  multiline
                  onChange={(e) => setName(e.target.value)}
                  style={{ width: "100%" }}
                />
              </Grid>
              <Grid item>
                <TextField
                  id="outlined-textarea"
                  value={desc}
                  label="Product Description"
                  multiline
                  onChange={(e) => setDesc(e.target.value)}
                  style={{ width: "100%" }}
                />
              </Grid>
              <Grid item style={{ display: "flex", justifyContent: "space-between" }} >
                <TextField
                  id="outlined-textarea"
                  label="Product Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  style={{ width: "45%" }}
                  type="number"

                />
                {/* <TextField
                  id="outlined-textarea"
                  label="Currency"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  style={{ marginLeft: "0", width: "45%" }}
                /> */}
                {/* <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="demo-simple-select-standard-label">Currency</InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={currencyValue}
                    onChange={(e) => { alert(e.target.text) }}
                    label="Currency"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>PKR</MenuItem>
                    <MenuItem value={20}>USD</MenuItem>
                    <MenuItem value={30}>EUR</MenuItem>
                  </Select>
                </FormControl> */}

                <Autocomplete
                  // value={value}
                  onChange={(event, newValue) => {
                    setCurrency(newValue)
                  }}

                  id="controllable-states-demo"
                  options={["PKR", "USD", "EUR"]}
                  sx={{ width: "45%" }}
                  renderInput={(params) => <TextField {...params} label="Currency" />}
                />
              </Grid>
              <Grid item>
                <TextField
                  id="outlined-textarea"
                  label="Product Stock"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  style={{ width: "100%" }}
                  type="number"

                />
              </Grid>
              <Grid item>
                <TextField
                  id="outlined-textarea"
                  onChange={(e) => setDiscount(e.target.value)}
                  label="Product Discount %"
                  type="number"
                  value={discount}
                  style={{ width: "100%" }}
                />
              </Grid>
              <Grid item>
                <TextField
                  id="outlined-textarea"
                  label="Product Ships To"
                  onChange={(e) => setShipTo(e.target.value)}
                  style={{ width: "100%" }}
                  value={ship}
                />
              </Grid>
              <Grid item xs={12} sm={12}>

                {product?.name ?
                  <>

                    <Button variant="contained" component="label" onClick={() => onClickHandle("update")}>

                      Update

                    </Button>

                  </> :
                  <Button variant="contained" component="label" onClick={() => onClickHandle("add")}>
                    Add Product
                  </Button>

                }
                <Link id="redirectingLink" to="/" />
              </Grid>

              <br />
            </Grid>
          </Grid>
        </Grid>
        : <></>}
    </>
  );
};

export default AddProduct;
